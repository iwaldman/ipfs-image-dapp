# ipfs-image-dapp

## TX.ORIGIN Problem

The contract uses msg.sender instead of tx.origin.

## Gas Limits

Does not loop over arrays of undetermined length.

Requires caller to specify an index when retrieving a specific image details. This reduces the chance of the gas cost exceeding the gas limit.

Limits the length of user supplied data. Each string has a max length.
