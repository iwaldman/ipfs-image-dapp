# ipfs-image-dapp

## TX.ORIGIN Problem

The contract uses msg.sender instead of tx.origin.

## Gas Limits

Does not loop over arrays of undetermined length. Uses the getImage by index. This reduces the chance of the gas cost exceeding the gas limit.

Run tests for gas usage.
limits the length of user supplied data. Each string has a max length.
