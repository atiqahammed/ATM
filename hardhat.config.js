// require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-web3");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    localhost: {
      url: `http://localhost:8545`,
      accounts: [`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
      accounts: [`84a98825bda686289593eea18bc3ead2891c66bcd69aa7a8ee5fafc3fc4f1fc4`]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
      accounts: [`84a98825bda686289593eea18bc3ead2891c66bcd69aa7a8ee5fafc3fc4f1fc4`]
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/QLT1FczPOXHfJo4do1540kfWSGGe5-IS`,
      accounts: [
        `0x2910ecaf76b4624bf95cb9fb216a96ae3d63a280b56220ed6851fd62d8850cde`,
        '0x8085fbf066fc7e93b8b4885155d1c3cb848896ebcc121a4bd503649d975085dd'
      ],
      gasPrice: 300000000000,
    },
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [
        '0xec0e8916183ffad7fa358a65f2d5fe9c4e45ffbd91d16e22266417d24c240ff7',
        '0x725f5cfd4f6d75bf727a65ff8e71e69972793eeac7b242a231fa58254e08f13f',
        '0xb13a46162d176b470e9e1eb58b38c5b9c167dae2ed63919eee9322d19b840f93',
      ],
    }
  }
};
