# Design Patterns
The following are design patterns we implemented in the ImageRegister Smart Contract per best practices.

## Circuit Breaker
The circuit breaker pattern allows the owner to disable or enable a contract by a runtime toggle. This would be desirable in situations where there is a live contract where a bug has been detected. Freezing the contract would be beneficial for reducing harm before a fix can be implemented.

  ```javascript
  contract CircuitBreaker {

    bool public stopped = false;

    modifier stopInEmergency { require(!stopped); _; }

    function deposit() stopInEmergency public { … }
    
  }
  ```

## Mortal
Implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain.
You can destroy a contract using the selfdestruct keyword. The function to do it is often called kill.  It takes one parameter which is the address that will receive all of the funds that the contract currently holds.  As an irreversible action, restricting access to this function is important.

We implement the mortal design pattern using the [Destrucible](https://openzeppelin.org/api/docs/lifecycle_Destructible.html) contract from the awesome [OpenZeppelin](https://openzeppelin.org/) library.

## Other Considerations
