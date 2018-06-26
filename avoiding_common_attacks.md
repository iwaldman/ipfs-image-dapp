# Avoiding Common Attacks

## Logic Bugs

There are comprehensive unit tests to ensure the contract behaves as expected. Test coverage is at 100%.

Running over X on-chain functional tests against the contract

Every attempt has been made to follow coding standards and best practices. This is verified by running the Solidity linter solium.

Every attempt has been made to minimize functional complexity by following the DRY, KISS and DRY principles.

## Reentrancy

There are no cases where functions can be called repeatedly before the first invocation of the function is finished.

## Cross-function Race Conditions

There are no external calls. So cross-function race conditions such as in the DAO attack are minimized.

## User Input

All user input is checked for bad data. The require statement is used to throw an exception if the input is not valid.

Limiting the length of user-supplied data such as monarch names.

We disallow characters in names that often have special meaning in computer systems such as <, > and ' to avoid causing problems for poorly-written software that reads contract data.

## Transaction-Ordering Dependence (TOD) / Front Running

## Timestamp Dependence

## Integer Overflow and/or Underflow correct

No mathematical calculations are performed in the ImageRegister contract. If so, it would have used the SafeMath library for safe operations.

## DoS

We have mitigated against this risk by:

Limiting the length of user-supplied data such as monarch names.
Avoiding looping behaviour where e.g. a function costs more and more gas each time is used.

## DoS with Block Gas Limit

## Forcibly Sending Ether to a Contract

Exposed Functions
It is easy to accidentally expose a contract function which was meant to be internal, or to omit protection on a function which was meant to be called only by priviledged accounts (e.g. by the creator).

We have mitigated against this risk by:

Auditing the compiler-generated ABI to ensure no unexpected functions appear.
