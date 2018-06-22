module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    rinkeby: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '4', // Rinkeby ID 4
      gas: 4700000,
    },
  },
}
