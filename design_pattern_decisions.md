# Design Patterns

The following are design patterns we implemented in the ImageRegister Smart Contract per best practices.

## Storage Optimization

Writing to blockchain can be expensive, as data stored forever. We must consider
smart ways to use memory (eventually, compilation will be better, but for now
benefits to planning data structures - and storing min amount in blockchain).

IPFS is perfect for storing large amounts of data. We only need to place the immutable, permanent IPFS links into a blockchain transaction. Doing so, we timestamp and secure the content, without having to put the data on the chain itself. Awesome, right?

## Circuit Breaker

The circuit breaker pattern allows the owner to disable or enable a contract by a runtime toggle. This would be desirable in situations where there is a live contract where a bug has been detected. Freezing the contract would be beneficial for reducing harm before a fix can be implemented.

```javascript
contract CircuitBreaker {

  bool public stopped = false;

  modifier stopInEmergency { require(!stopped); _; }

  function deposit() stopInEmergency public { … }

}
```

## Mortal aka Selfdestruct

Implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain.

You can destroy a contract using the selfdestruct keyword. The function to do it is often called kill. It takes one parameter which is the address that will receive all of the funds that the contract currently holds. As an irreversible action, restricting access to this function is important.

We implement the mortal design pattern using the [Destrucible](https://openzeppelin.org/api/docs/lifecycle_Destructible.html) contract from the awesome [OpenZeppelin](https://openzeppelin.org/) library.

## Fallback Function

This function is called for all messages sent to this contract (there is no other function). Sending Ether to this contract will cause an exception,
because the fallback function does not have the `payable` modifier.

## Other Considerations

Factory pattern
