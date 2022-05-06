pragma solidity 0.8.4;

contract CreaboFund {

    address public withdrawWallet;

    constructor(address payable admin) {
        withdrawWallet = admin;
    }

    event Transfer(uint amount, uint projectId);


    function transferFund(uint projectId, uint amount) public payable {
        emit Transfer(amount, projectId);
    }

    function withdraw() public {
        (bool success, ) =  payable(withdrawWallet).call{
            value: address(this).balance
        }("");
        require(success);
    }
}