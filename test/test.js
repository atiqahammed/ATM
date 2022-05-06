const { expect } = require("chai");
const hardhat = require("hardhat");
const { ethers } = hardhat;
const { LazyMinter } = require("../lib");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// const web3 = require("@nomiclabs/hardhat-web3");
const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;

describe("CreaboFund", function () {
  it("Should deploy", async function () {

    // const privateKey = Buffer.from(
    //   "d2b403bac432d2612cbca3f18168677177521bc5a01861696c987560c2fb7bdf",
    //   "hex"
    // );

    // let abi = require('../artifacts/contracts/CreaboFund.sol/CreaboFund.json').abi;
    // const iface = new ethers.utils.Interface(abi);
    // const encodedData = iface.encodeFunctionData('transferFund', [10, 5]);
    // // console.log(encodedData);


    
    // const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
    // const nonce = await web3.eth.getTransactionCount('0x21948546BFA9bF083B3Fa1552844576048d407F1', 'latest');

    // // let balance1 = await web3.eth.getBalance('0x0421951a92Bd4Bd1a96638aAF9dc7A540f3751Ef');
    // // console.log(balance1)

    // let tx = new Tx({
    //     nonce: nonce,
    //     gasPrice: 0,
    //     gasLimit: 100000,
    //     to: "0x2CD9deCaf5dE89BdBc22FCCe8E6F88D699b89057",
    //     value: Number(web3.utils.toWei('5', 'ether')),
    //     data: encodedData
    // });


    // console.log('here');
    // tx.sign(privateKey);

    // console.log(['Signature', "0x" + tx.serialize().toString("hex")])
    
    // let receipt = await web3.eth.sendSignedTransaction("0x" + tx.serialize().toString("hex"));
    // let receipt = await web3.eth.sendSignedTransaction('0xf8698080830186a0940174965f7ad2442bd158408749138b037a1b98f98711c37937e0800080820a96a0b6210183f4251124e41febe981808d834667b6857c09347a5877ddf04715c9d3a014f1b99c2f79c38608750beb37e30953a675706bcf963ed6e16146bbc355eecd');

    // console.log(receipt)
    
    // balance1 = await web3.eth.getBalance('0x260926ea777c2Ba74abc373483B07da519aBE690');
    // console.log(balance1)













    const signers = await ethers.getSigners();
    // const signer = signers[1];
    const admin = signers[0];
    // // console.log('here');
    // // // const admin2 = signers[2];
    // // // console.log(signer.address);

    // // // // expect(signer).not.null;

    // const address = signer.address;
    // const signer2 = new ethers.VoidSigner(address, ethers.provider);

    const CreaboFund = await ethers.getContractFactory("CreaboFund");
    const CreaboFundContract = CreaboFund.attach('0x003128A6e0dE970Ee32Da3bf9f665dD02C021D40');
    // const CreaboFundContract = await CreaboFund.deploy('0xB3B048d4280663672aab3cd00e9dcbfe2D336119');
    // await CreaboFundContract.deployed();

    // //0x455863309B4ffd80Cb6CdD1517B77c9354aA6c8F
    console.log(CreaboFundContract.address);    


    // const voucher = {
    //   projectId: 1,
    //   amount: 10,
    //   signature: '0x827bea4ce373ff6be8a0314969955c29326e89dacd77607a51c379dee91c6b8c7f761e64cfcdc4b1ef35944503f2f098f0fd5ea9d6016ad3f00da13797cbff4f1c'
    // }

    // // const lazyMinter = new LazyMinter({ contractAddress: '0x455863309B4ffd80Cb6CdD1517B77c9354aA6c8F', signer: signer });
    // // const voucher = await lazyMinter.createVoucher(1, 10);

    // console.log(voucher);

    const web3 = createAlchemyWeb3(`wss://polygon-mumbai.g.alchemy.com/v2/QLT1FczPOXHfJo4do1540kfWSGGe5-IS`);

    // Subcribes to the event and prints results 
    // web3.eth.subscribe("Transfer").on("data", (data) => console.log(data));
    // web3.eth.subscribe("alchemy_newFullPendingTransactions").on("data", (data) => console.log('event',data));

    let subscription = web3.eth.subscribe('logs',(err,event) => {if (!err)
      console.log(event)});



    let transaction1 = await CreaboFundContract.connect(admin).transferFund(1, 10);
    // console.log(transaction1)
    // let transaction2 = await CreaboFundContract.connect(signer2).transferFundTest(voucher, { gasPrice: 300000000000, value: 10000000000, address: signer2.address });
    // console.log(transaction2);
    
    // const adminSigner = new LazyMinter({ contractAddress: CreaboFundContract.address, signer: admin });
    
    // const adminVoucher = await adminSigner.createVoucher(1, 2500);
    // let transaction3 = await CreaboFundContract.connect(admin).withdraw(adminVoucher);
    // let transaction4 = await CreaboFundContract.connect(admin).changeAdmin(admin2.address);

    // const admin2Signer = new LazyMinter({ contractAddress: CreaboFundContract.address, signer: admin2 });
    // const admin2Voucher = await admin2Signer.createVoucher(1, 2500);
    // let transaction5 = await CreaboFundContract.connect(admin2).withdraw(admin2Voucher);

   
    // console.log(transaction2);

    //   // const tx = new EthTx(signature, {chain: 'hardhat', hardfork: 'petersburg'})

      // let transaction = web3.eth.accounts.recover(voucher, signature);
    //   // console.log(['transaction', transaction]);

    //   // console.log(atmContract.address);

    //   const msgParams = {
    //     // data: nonce,
    //     sig: signature
    // };
    // const output =  ethSigUtil.extractPublicKey(msgParams);
    // console.log(output);

    // const recoveredPubKey = ethers.utils.recoverPublicKey(
    //   digest,
    //   signature
    // );
    // const recoveredAddress = ethers.utils.recoverAddress(digest, signature);
    // console.log(recoveredAddress);
    // console.log(recoveredPubKey);

    // const message = ethers.utils.solidityKeccak256(
    //   ['uint256', 'uint256', 'string'],
    //  [voucher.tokenId, voucher.minPrice, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(voucher.uri))]);
    //  const arrayified_message = ethers.utils.arrayify(message);

    // const web3 = new Web3(
    //   new Web3.providers.HttpProvider(
    //       `http://localhost:7545`
    //   )
    // );
    
    // var privateKey = Buffer.from('e3e22d04350b4b28dab274b8adec7098141fdf986ece38d28ef03fe9e78a9490', 'hex');

    // var rawTx = {
    //   to: '0x0000000000000000000000000000000000000000',
    //   value: '0x00',
    //   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
    // }

    // // console.log(rawTx);

    // var tx = new Tx(rawTx);
    // console.log(tx);
    // tx.sign(privateKey);

    // var serializedTx = tx.serialize();


    // console.log(serializedTx.toString('hex'));
    // // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
    // console.log('here');

    // // console.log(web3.eth);
    // await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    // let receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    // console.log(receipt);

    /*
  // web3.eth.accounts.recover('Some data', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c');
  // web3.eth.accounts.recover('Some data', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c');
    */
    // then( (signed_msg) => {
    //                     console.log('address: ' + ethers.utils.recoverAddress(message1, signed_msg))
    //uint256 tokenId,uint256 minPrice,string uri utils.keccak256(utils.toUtf8Bytes("example"))
    // web3.eth.accounts.recover('Some data', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c');
  });
});
