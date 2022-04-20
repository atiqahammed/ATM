pragma solidity 0.8.4;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract CreaboFund is EIP712, AccessControl  {

    string private constant SIGNING_DOMAIN = "CREABO-Voucher";
    string private constant SIGNATURE_VERSION = "1";

    struct CREABOVoucher {
        uint projectId;
        uint amount;
        bytes signature;
    }

    constructor()
        EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION){}

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

    function withdraw(uint amount, CREABOVoucher calldata voucher) public {
        address signer = _verify(voucher);
        require(msg.sender == signer, "Signature invalid or unauthorized");
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Withdrawal(msg.sender, amount);
        balances[msg.sender] -= amount;
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