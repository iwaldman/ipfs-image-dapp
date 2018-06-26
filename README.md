# ipfs-image-dapp

## Overview
IPFS and the Blockchain are a perfect match.  Why? You can address large amounts of data with IPFS, and place the immutable, permanent IPFS links into a blockchain transaction. Doing so timestamps and secures your content, without having to put the data on the chain itself. You now have undisputable proof that your image existed at that time it was uploaded.  Awesome, right? 

This project is a basic decentralized application that demonstrates how to implement IPFS file uploads and store the IPFS hash in an Ethereum smart contract.

## Our stack
For this project, we used the following stack:

- Solidity Smart Contracts
- IPFS for storing image data via Infura
- Truffle and Ganache for our development and testing framework
- React / Redux / Bootstrap 4 for our front-end development
- MetaMask for our web3 provider

## Prerequisites

1. You will need Metamask plugin for Chrome.  While there are other options available, only Metamask is covered here.
2. Make sure you have [Node.js](https://nodejs.org/en/) installed. If you run into trouble, this was created with `v10.1.0`.

## Installation

1. Install [Truffle Framework](http://truffleframework.com/) and [Ganache CLI](http://truffleframework.com/ganache/) globally. If you prefer, the graphical version of Ganache works as well!
    ```bash
    npm install -g truffle
    npm install -g ganache-cli
    ```

2. Run the development blockchain passing in a blocktime. Otherwise, its difficult to track things like loading indicators because Ganache will mine instantly.
    ```bash
    // 3 second blocktime
    ganache-cli -b 3
    ```

4. Clone or download the repo then install its dependencies.
    ```bash
    npm install
    ```
   * If you get an error on install, don't panic. It should still work.
   
5. Compile and migrate the smart contracts.
    ```bash
    truffle compile
    truffle migrate
    ```

6. Start the application 
    ```bash
    npm run start
    ```
    
7. Navigate to http://localhost:3000/ in your browser.

8. Remember to connect [MetaMask](https://metamask.io/) to one of your local Ganache Ethereum accounts 
   * Create and connect to a custom RPC network using the Ganache RPC server (currently `http://127.0.0.1:8545`)
   * Import a new account and use the account seed phrase provided by Ganache


## Testing
To run the unit tests.
```shell
$ truffle test
Using network 'development'.

  Contract: ImageRegister
    ✓ has an owner
    ✓ should selfdestruct
    ✓ should store an image (210ms)
    ✓ should emit a LogImageUploaded event when storing an image (67ms)
    ✓ should return image details (152ms)
    ✓ should return image count (154ms)
    ✓ should store images for any number of owners (445ms)
    ✓ should require a valid IPFS hash when uploading an image (41ms)
    ✓ should require a valid title when uploading an image (44ms)
    ✓ should require a valid description when uploading an image (96ms)
    ✓ should require tags when uploading an image (38ms)
    ✓ should require a valid address when retrieving image count
    ✓ should require a valid index when retrieving image details

  13 passing (2s)
```

## Troubleshooting Tips
* Is Ganache running?
* Is your MetaMask account unlocked?
* Are you using the MetaMask account associated with your Ganache account (the one we created above)?
* Are you using your custom RPC network in MetaMask?
* If MetaMask can't find your RPC network, try switching to the Rinkeby Test Network and back.
* Did you `truffle compile` and `truffle migrate` whenever starting your local network or making changes to your smart contract?
* Transaction error? Try resetting the MetaMask account you created under settings.
* Is `truffle migrate` showing stale settings? Try `truffle migrate --reset`

## Where can I find more documentation?
This application is a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start.

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project uses [Bootstrap 4](https://getbootstrap.com/).

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
