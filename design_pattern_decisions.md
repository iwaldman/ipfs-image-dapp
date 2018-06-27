# ipfs-image-dapp

## TX.ORIGIN Problem

The contract uses msg.sender instead of tx.origin.

## Gas Limits

Does not loop over arrays of undetermined length.

Requires caller to specify an index when retrieving specific image details. 

Limits the length of user supplied data. Each string has a max length.

These reduces the chance of the gas cost exceeding the gas limit.




### Ideas
Design Pattern Requirements:
○  	Implement emergency stop
○  	What other design patterns have you used / not used?
■  	Why did you choose the patterns that you did?
■  	Why not others?

circuit_breaker - The circuit breaker pattern allows the owner to disable or enable a contract by a runtime toggle. security/circuit_breaker.sol

Circuit Breaker

Circuit Breakers are design patterns that allow contract functionality to be stopped. This would be desirable in situations where there is a live contract where a bug has been detected. Freezing the contract would be beneficial for reducing harm before a fix can be implemented.


Circuit breaker contracts can be set up to permit certain functions in certain situations. For example, if you are implementing a withdrawal pattern, you might want to stop people from depositing funds into the contract if a bug has been detected, while still allowing accounts with balances to withdraw their funds.


contract CircuitBreaker {

bool public stopped = false;

modifier stopInEmergency { require(!stopped); _; }

modifier onlyInEmergency { require(stopped); _; }

function deposit() stopInEmergency public { … }

function withdraw() onlyInEmergency public { … } 

}


Mortal





Implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain.

 


You can destroy a contract using the selfdestruct keyword. The function to do it is often called kill.


It takes one parameter which is the address that will receive all of the funds that the contract currently holds.


As an irreversible action, restricting access to this function is important.
