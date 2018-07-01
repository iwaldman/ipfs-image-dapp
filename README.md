# ipfs-image-dapp

## Overview

IPFS and the Blockchain are a perfect match. Why? You can address large amounts of data with IPFS and place the immutable, permanent IPFS links into a blockchain transaction. This will timestamp and secure your content, without having to put the data on the chain itself. You now have undisputable proof that your image existed at that time it was uploaded.

This project is an Ethereum Decentralized Application (dApp) using React, Redux, React Router and Bootstrap. It demonstrates how to implement IPFS file uploads and store the IPFS hash on the blockchain.

## Usage

### Main Page

In this application, the main page displays a list of image cards filtered by owner i.e. MetaMask account. Each image card displays the image, title, description, tags, upload timestamp and IPFS hash.

![IPFS Image dApp](../master/app.png?raw=true 'IPFS Image dApp')

### Upload an Image

Click _Upload Image_ to upload an image to IPFS and the blockchain. You are required to enter an image title, optional description and appropriate tags. Click _Upload_ to submit.

![IPFS Image dApp](../master/upload-image.png?raw=true 'IPFS Image dApp')

## Our stack

For this project, we used the following stack:

- Solidity Smart Contracts
- IPFS for storing image data via Infura
- Truffle and Ganache for our development and testing framework
- React / Redux / Bootstrap 4 for our front-end development
- MetaMask for our web3 provider
- OpenZeppelin library

## Prerequisites

1.  You will need [Metamask](https://metamask.io/) plugin for Chrome.
2.  Make sure you have [Node.js](https://nodejs.org/en/) installed.

## Installation

1.  Install [Truffle Framework](http://truffleframework.com/) and [Ganache CLI](http://truffleframework.com/ganache/) globally. If you prefer, the graphical version of Ganache works as well.

    ```bash
    npm install -g truffle
    npm install -g ganache-cli
    ```

2.  Run the development blockchain.

    ```bash
    // no blocktime specified so transaction will be mined instantly
    ganache-cli
    ```

    You may want to pass in a blocktime. Otherwise, it's difficult to track things like loading indicators because Ganache will mine instantly.

    <strong>Note</strong>: We've noticed that using a blocktime while running `truffle test` causes issues.

    ```bash
    // 3 second blocktime
    ganache-cli -b 3
    ```

3.  Open another terminal, clone this repo and install its dependencies.

    ```bash
    git clone https://github.com/iwaldman/ipfs-image-dapp.git

    cd ipfs-image-dapp

    npm install
    ```

    <strong>Note</strong>: If you get an error on install, don't panic. It should still work.

4.  Compile and migrate the smart contracts.

    ```bash
    truffle compile
    truffle migrate

    # You can combine into one command
    truffle migrate --reset ---compile-all
    ```

5.  Start the application

    ```bash
    npm run start
    ```

6.  Navigate to http://localhost:3000/ in your browser.

7.  Remember to connect [MetaMask](https://metamask.io/) to one of your local Ganache Ethereum accounts

    - Connect to Localhost 8545, or
    - Create and connect to a custom RPC network using the Ganache RPC server (currently `http://127.0.0.1:8545`), then
    - Import a new account and use the account seed phrase provided by Ganache

      ![IPFS Image dApp](../master/metamask-choose-network.png?raw=true 'IPFS Image dApp')

## Testing

To run the unit tests.

```shell
$ truffle test
Using network 'development'.

  Contract: ImageRegister
    ✓ has an owner
    ✓ should selfdestruct (59ms)
    ✓ should store an image (75ms)
    ✓ should emit a LogImageUploaded event when storing an image (83ms)
    ✓ should return image details (103ms)
    ✓ should return image count (139ms)
    ✓ should store images for any number of owners (255ms)
    ✓ should require a valid IPFS hash when uploading an image (42ms)
    ✓ should require a valid title when uploading an image (44ms)
    ✓ should require a valid description when uploading an image (76ms)
    ✓ should require tags when uploading an image (42ms)
    ✓ should require a valid address when retrieving image count
    ✓ should require a valid index when retrieving image details
    ✓ should allow the owner to perform an emergency stop
    ✓ should disallow a non-owner to perform an emergency stop
    ✓ should disallow uploading an image when there is an emergency stop (43ms)
    ✓ should emit a LogEmergencyStop event when performing an emergency stop

  17 passing (2s)
```

## Deploy to Rinkeby TestNet

Steps to deploy our smart contract directly from Truffle with Infura to the Rinkeby TestNet.

1.  Get an [Infura](https://infura.io/) API key. You can sign up for [free](https://infura.io/signup).
2.  Create a .env file in the root directory if it doesn't exist
    ```bash
    cd ipfs-image-dapp
    touch .env
    ```
3.  Update the .env file with your MetaMask mnenomic and Infura API Key
    ```javascript
    MNENOMIC = '<Your MetaMasks recovery words>'
    INFURA_API_KEY = '<Your Infura API Key after its registration>'
    ```
4.  Deploy to Rinkeby with `truffle migrate --reset --compile-all --network rinkeby`

    ```bash
    $ truffle migrate --reset --compile-all --network rinkeby
    Compiling ./contracts/ImageRegister.sol...
    Compiling ./contracts/Migrations.sol...
    Compiling openzeppelin-solidity/contracts/lifecycle/Destructible.sol...
    Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol...
    Writing artifacts to ./build/contracts

    Using network 'rinkeby'.

    Running migration: 1_initial_migration.js
      Replacing Migrations...
      ... 0xdcbf4bb0d236e0fefbe693bcc72d5fba19bf8399f2ae55510a2fd7d5ed1e3e70
      Migrations: 0x523bbc842b62f7887303fc3a93a697780cb6899c
    Saving successful migration to network...
      ... 0xea26b5ca3f7d4d8613234923bde361156576797810320ebadf106449cdc1648b
    Saving artifacts...
    Running migration: 2_deploy_contracts.js
      Replacing ImageRegister...
      ... 0x10ddf748932a635fad7f4e0e2112c9008aa3fd79abcf513d1a7cc6f57edc82be
      ImageRegister: 0x93a2b11a3656a419e24732ddcb6293251804c8c9
    Saving successful migration to network...
      ... 0x34fda38267e92b0cc6449bca80415c9e3438236191c1ed9a9536e1df9c9e59a9
    Saving artifacts...
    ```

5.  Run the application as described above.

Check out the awesome tutorial [Deploy Your Smart Contract Directly from Truffle with Infura](https://medium.com/coinmonks/deploy-your-smart-contract-directly-from-truffle-with-infura-ba1e1f1d40c2) by Hyungsuk Kang.

## Troubleshooting Tips

- Is Ganache running?
- Is your MetaMask account unlocked?
- Are you using the MetaMask account associated with your Ganache account?
- Are you using your custom RPC network in MetaMask?
- If MetaMask can't find your RPC network, try switching to the Rinkeby Test Network and back.
- Did you `truffle compile` and `truffle migrate` whenever starting your local network or making changes to your smart contract?
- Transaction error? Try resetting the MetaMask account you created under settings.
- Is `truffle migrate` showing stale settings? Try `truffle migrate --reset`
- Images do not appear right away? Have noticed on Mac that ganache-cli will drop transactions. If you are using the Rinkeby TestNet, it may take up to a minute before the transaction is mined.

## Where can I find more documentation?

This application is a marriage of [Truffle](http://truffleframework.com/) and a React project created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start.

You can also check out the official sites for the [Ethereum Project](https://ethereum.org/), [OpenZeppelin](https://openzeppelin.org/) library and [IPFS](https://ipfs.io/).

## Host the UI on IPFS

There seem to be a number of issues hosting a `create-react-app` on IPFS. Take a look at the following links if you are interested in exploring this:

- [How to deploy/write React/Redux apps on IPFS](https://www.reddit.com/r/ipfs/comments/6ba9ck/how_to_deploywrite_reactredux_apps_on_ipfs/)
- [ipfs-webpack-plugin
  ](https://www.npmjs.com/package/ipfs-webpack-plugin) - IPFSWebpackPlugin is a plugin for webpack that makes it easy for you to load your generated assets via IPFS. It comes with a loader you can use instead of loading assets directly, and your assets will be loaded via the IPFS network instead.

## Future enhancements

- Add a visual indicator of the number of image uploads in-progress
- Use optimistic UI updates
- Improve web3 error handling, use React error boundaries
- Image upload wizard workflow
- Allow video uploads
- Allow update of image metadata e.g. title, description, tags

## Notes

This project uses [Bootstrap 4](https://getbootstrap.com/).

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# License

MIT
