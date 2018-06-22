# ipfs-image-dapp

For this project, we used the following stack:

Solidity Smart Contracts
IPFS for storing image data via Infura
Truffle and Ganache for our development and testing framework
React / Redux / Bootstrap for our front-end development
MetaMask for our web3 provider

## Getting Started

- Have [node](https://nodejs.org/en/) installed. If you run into trouble, this was created with `v10.1.0`
- Install and run [Ganache](http://truffleframework.com/ganache/)
- Install [MetaMask](https://metamask.io/)

1.  Create and connect to a custom RPC network using the Ganache RPC server (currently `http://127.0.0.1:8545`)
2.  Import a new account and use the private key provided by Ganache from account 1.

- Install the [Truffle Framework](http://truffleframework.com/)
  - `npm install -g truffle`
- Clone or download the repo
- Type `npm install`
  - If you get an error on install, don't panic. It should still work.
- Type `truffle compile` and `truffle migrate`
- Type `npm run start`

### Remember these steps when starting a new development session.

1.  Start Ganache.
2.  Unlock MetaMask with local RPC network.
3.  Switch accounts to the one we imported as described above.
4.  `truffle compile`
5.  `truffle migrate`
6.  `npm run start`

### Testing

Type `truffle test` to test.

## Troubleshooting Tips

- Is Ganache running?
- Is your MetaMask account unlocked?
- Are you using the MetaMask account associated with your Ganache account (the one we created above)?
- Are you using your custom RPC network in MetaMask?
- If MetaMask can't find your RPC network, try switching to the Rinkeby Test Network and back.
- Did you `truffle compile` and `truffle migrate` whenever starting your local network or making changes to your smart contract?
- Transaction error? Try resetting the MetaMask account you created under settings.
- Is `truffle migrate` showing stale settings? Try `truffle migrate --reset`
