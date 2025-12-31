require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // .env dosyasını okumak için

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  // Burayı ekliyoruz:
  etherscan: {
    apiKey: {
      arbitrumSepolia: "BURAYA_ARBISCAN_API_KEY_GELECEK" 
    }
  }
};