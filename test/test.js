const { expect } = require("chai");
const hardhat = require("hardhat");
const { ethers } = hardhat;
const { LazyMinter } = require("../lib");
// const web3 = require("@nomiclabs/hardhat-web3");

describe("CreaboFund", function () {
  it("Should deploy", async function () {
    const signers = await ethers.getSigners();
    const signer = signers[0];
    const admin = signers[1];
    const admin2 = signers[2];
    console.log(signer.address);

    expect(signer).not.null;
    const CreaboFund = await ethers.getContractFactory("CreaboFund");
    const CreaboFundContract = await CreaboFund.deploy(admin.address);
    await CreaboFundContract.deployed();

    const lazyMinter = new LazyMinter({ contractAddress: CreaboFundContract.address, signer: signer });
    const voucher = await lazyMinter.createVoucher(1, 5000);

    let transaction1 = await CreaboFundContract.deposit({ from: signer.address, value: 5000 });
    let transaction2 = await CreaboFundContract.transferFund(admin.address, voucher);
    
    const adminSigner = new LazyMinter({ contractAddress: CreaboFundContract.address, signer: admin });
    
    const adminVoucher = await adminSigner.createVoucher(1, 2500);
    let transaction3 = await CreaboFundContract.connect(admin).withdraw(adminVoucher);
    let transaction4 = await CreaboFundContract.connect(admin).changeAdmin(admin2.address);

    const admin2Signer = new LazyMinter({ contractAddress: CreaboFundContract.address, signer: admin2 });
    const admin2Voucher = await admin2Signer.createVoucher(1, 2500);
    let transaction5 = await CreaboFundContract.connect(admin2).withdraw(admin2Voucher);


    // console.log(transaction2);

    //   // const tx = new EthTx(signature, {chain: 'hardhat', hardfork: 'petersburg'})

    //   // let transaction = web3.eth.accounts.recover(voucher, signature);
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

    //  const recoveredAddress2 = ethers.utils.recoverAddress(arrayified_message, signature);

    //  console.log(recoveredAddress2)

    //  const signThing = "0x50e255a73d200fd6365e4c58f756df5dd7e26ed02bed3b5a9baca066394fba26";
    //  const message1 = signThing;
    //                   const message2 = ethers.utils.arrayify(message1);

    //   let sig = await minter.signMessage(message2);
    //   console.log(sig);

    //   let address = ethers.utils.recoverAddress(message1, sig);
    //   console.log(address);

    //   console.log('--------------');

    //   let hashMessage = ethers.utils.hashMessage("Hello World");
    //   // const array = ethers.utils.arrayify(message1);
    //   let sign = await minter.signMessage(hashMessage);
    //   console.log(sign);
    //   address = ethers.utils.verifyMessage(hashMessage, sign);
    //   console.log(address);
    //   console.log(minter.address);

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
