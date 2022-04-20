const ethers = require('ethers')
const { TypedDataUtils } = require('ethers-eip712')


const SIGNING_DOMAIN_NAME = "CREABO-Voucher"
const SIGNING_DOMAIN_VERSION = "1"

class LazyMinter {

  constructor({ contractAddress, signer }) {
    this.contractAddress = contractAddress
    this.signer = signer

    this.types = {
      EIP712Domain: [
        {name: "name", type: "string"},
        {name: "version", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "verifyingContract", type: "address"},
      ],
      CREABOVoucher: [
        {name: "projectId", type: "uint"},
        {name: "amount", type: "uint"},
      ]
    }
  }

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain
    }
    const chainId = await this.signer.getChainId()
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    }
    return this._domain
  }

  async createVoucher(projectId, amount = 10) {
    const voucher = { projectId, amount }
    const domain = await this._signingDomain()
    const types = {
      CREABOVoucher: [
        {name: "projectId", type: "uint"},
        {name: "amount", type: "uint"},
      ]
    }
    const signature = await this.signer._signTypedData(domain, types, voucher)
    return {
      ...voucher,
      signature,
    }
  }
}

module.exports = {
  LazyMinter
}
