const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 4700000,
    },
    rinkeby2: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '4', // Rinkeby ID 4
      gas: 4700000,
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          'immune trim build buyer nature arm tube exercise wolf until spider sport',
          'https://rinkeby.infura.io/4gGyGdZ5Wkk5jfeK5vfY'
        )
      },
      network_id: '1',
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
}
