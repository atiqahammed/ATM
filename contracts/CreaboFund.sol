pragma solidity 0.8.4;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract CreaboFund is EIP712, AccessControl  {

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    string private constant SIGNING_DOMAIN = "CREABO-Voucher";
    string private constant SIGNATURE_VERSION = "1";

    struct CREABOVoucher {
        uint projectId;
        uint amount;
        bytes signature;
    }

    constructor(address payable admin) 
        EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
            _setupRole(ADMIN_ROLE, admin);
        }

    mapping(address => uint) public balances;

    event Deposit(address sender, uint amount);
    event Withdrawal(address receiver, uint amount);
    event Transfer(address sender, address receiver, uint amount, uint256 projectId);

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value);
        balances[msg.sender] += msg.value;
    }
    function _hash(CREABOVoucher calldata voucher) internal view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(
            keccak256("CREABOVoucher(uint projectId,uint amount)"),
            voucher.projectId,
            voucher.amount
        )));
    }

    function _verify(CREABOVoucher calldata voucher) internal view returns (address) {
        bytes32 digest = _hash(voucher);
        return ECDSA.recover(digest, voucher.signature);
    }

    function withdraw(CREABOVoucher calldata voucher) public {
        address signer = _verify(voucher);
        require(msg.sender == signer, "Signature invalid or unauthorized");
        require(hasRole(ADMIN_ROLE, signer), "Signature invalid or unauthorized");
        require(balances[signer] >= voucher.amount, "Insufficient funds");
        emit Withdrawal(signer, voucher.amount);
        balances[signer] -= voucher.amount;
    }

    function changeAdmin(address newAdmin) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Signature invalid or unauthorized");
        uint adminBalance = balances[msg.sender];
        emit Transfer(msg.sender, newAdmin, adminBalance, 1);
        balances[msg.sender] -= adminBalance;
        balances[newAdmin] += adminBalance;
        _setupRole(ADMIN_ROLE, newAdmin);
    }

    function transferFund(address receiver, CREABOVoucher calldata voucher) public {
        address signer = _verify(voucher);
        require(msg.sender == signer, "Signature invalid or unauthorized");
        require(balances[msg.sender] >= voucher.amount, "Insufficient funds");
        emit Transfer(msg.sender, receiver, voucher.amount, voucher.projectId);
        balances[msg.sender] -= voucher.amount;
        balances[receiver] += voucher.amount;
    }
}