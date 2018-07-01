# Avoiding Common Attacks

## Logic Bugs
There are comprehensive unit tests to ensure the contract behaves as expected.

Every attempt has been made to follow established coding standards and best practices. This is verified by running the Solidity linter [solium](http://solium.readthedocs.io/en/latest/user-guide.html).

Every attempt has been made to minimize functional complexity by following SOLID principles.

## Reentrancy
There are no cases where functions can be called repeatedly before the first invocation of the function is finished.

## Cross-function Race Conditions
There are no external calls. So cross-function race conditions such as in the DAO attack are minimized.

## User Input
All user input is checked for bad data. The require statement is used to throw an exception if the input is not valid.

We limit the length of user-supplied data such as image title and description.

## Integer Overflow and/or Underflow
No mathematical calculations are performed in the ImageRegister contract. If so, we would have used the [SafeMath](https://openzeppelin.org/api/docs/math_SafeMath.html) library for safe math operations.

## DoS
We have mitigated against this risk by:
 * Limiting the length of user-supplied data.
 * Avoiding looping behavior where e.g. a function costs more and more gas each time is used.

## DoS with Block Gas Limit
We do not loop over arrays of undetermined length.

The caller is required to specify a valid index when retrieving specific image details. 

There are limits to the length of user supplied data. Each string has a max length.

These practices reduce the chance of the gas cost exceeding the gas limit.

## TX.ORIGIN Problem
The contract uses msg.sender instead of tx.origin. 

See [Solidity: Tx Origin Attacks](https://medium.com/coinmonks/solidity-tx-origin-attacks-58211ad95514) for more information.

## Exposed Functions
It is easy to accidentally expose a contract function which was meant to be internal, or to omit protection on a function which was meant to be called only by priviledged accounts (e.g. by the creator).

We have mitigated against this risk by:
 * Following coding standards and best practices. This is verified by running the Solidity linter [solium](http://solium.readthedocs.io/en/latest/user-guide.html).
 * Auditing the compiler-generated ABI to ensure no unexpected functions appear.
 
## For more information
* [Security Considerations](http://solidity.readthedocs.io/en/develop/security-considerations.html)
* [Security Best Practices](https://github.com/ConsenSys/smart-contract-best-practices)
