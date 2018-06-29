# Design Patterns

The following are design patterns we implemented in the ImageRegister Smart Contract per best practices.

## Storage Optimization

Writing to blockchain can be expensive, as data is stored forever. We must consider smart ways to use memory while storing minimum amount in blockchain.

IPFS is perfect for storing large amounts of data. We only need to place the immutable, permanent IPFS links into a blockchain transaction. Doing so, we timestamp and secure the content, without having to put the data on the chain itself. 

Awesome, right?

## Circuit Breaker

The circuit breaker pattern allows the owner to disable or enable a contract by a runtime toggle. This would be desirable in situations where there is a live contract where a bug has been detected. Freezing the contract would be beneficial for reducing harm before a fix can be implemented.

```javascript
contract CircuitBreaker {

  bool public stopped = false;

  modifier stopInEmergency { require(!stopped); _; }

  function shootFoot() stopInEmergency public { … }

}
```

## Mortal aka Selfdestruct

Implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain.

You can destroy a contract using the selfdestruct keyword. The function to do it is often called kill. It takes one parameter which is the address that will receive all of the funds that the contract currently holds. As an irreversible action, restricting access to this function is important.

We implement the mortal design pattern using the [Destrucible](https://openzeppelin.org/api/docs/lifecycle_Destructible.html) contract from the [OpenZeppelin](https://openzeppelin.org/) library.

## Fallback Function

A Solidity contract may have a single unnamed function, no more no less. This functions cannot have any arguments, nor return anything.

That is what we refer to as a fallback function.

Fallback functions are executed if a contract is called and no other function matches the specified function identifier, or if no data is supplied.

These functions are also executed whenever a contract would receive plain Ether, without any data.

In addition to that, to enable receiving Ether, you have to mark the fallback function payable. When no function like that is present, the contract is unable to receive Ether cia regular transactions.

See [Solidity Fallback Functions](https://www.bitdegree.org/learn/solidity-fallback-functions/) for more details.

## Other considerations
An IPFS hash is often represented using 46 character long Base58 encoding e.g. QmahqCsAUAw7zMv6P6Ae8PjCTck7taQA6FgHQLnWdKG7U98. 

As a result, an IPFS hash cannot fit in the largest fixed-size byte arrays of bytes32.

We chose to use string which is a dynamically sized datatype that did not require us to perform any conversions while serving our demo purposes. Any enterprise app would need to convert base58 encoded strings to and from smart contract arguments and responses.
