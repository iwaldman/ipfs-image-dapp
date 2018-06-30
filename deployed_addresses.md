# Deployed Addresses

## Rinkeby TestNet

```bash
$ truffle migrate --reset --compile-all --network rinkeby

Compiling ./contracts/ImageRegister.sol...
Compiling ./contracts/Migrations.sol...
Compiling openzeppelin-solidity/contracts/lifecycle/Destructible.sol...
Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol...

Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x83756ba3ba175d450910a76493814149766970a480c4e4a5f73d92590970b2bd
  Migrations: 0x4d9aba5965dcd2eeb6749a11cb5e1647f0e8ba1e
  
Saving successful migration to network...
  ... 0x44998a4eba0b05e3218175d8151a4cc17d2a24ddfefc761d4d21a9d65e5a031b
  
Saving artifacts...

Running migration: 2_deploy_contracts.js
  Deploying ImageRegister...
  ... 0x23791e6e1a14230b7a3a8274f30e40cee00b99dd023b052b53e03268687188b3
  ImageRegister: 0xa7f50284b4c1edf998b12353f1a8074ad5b42500
  
Saving successful migration to network...
  ... 0xff75291e4da759d23f3ef2386bb09f22614a3278300f7e228c3818101e751f73
  
Saving artifacts...
```
