## Public Key (Accounts)

## CATEGORY

Smart Contracts

## Challenge

Recall that an address is the last 20 bytes of the keccak-256 hash of the address’s public key.

To complete this challenge, find the public key for the owner's account.

```
pragma solidity ^0.4.21;

contract PublicKeyChallenge {
    address owner = 0x92b28647ae1f3264661f72fb2eb9625a89d88a31;
    bool public isComplete;

    function authenticate(bytes publicKey) public {
        require(address(keccak256(publicKey)) == owner);

        isComplete = true;
    }
}
```

## Solution

To solve this challenge, we have to determine the public key for the address 0x92b28647ae1f3264661f72fb2eb9625a89d88a31.

The public key is the last 20 bytes of the keccak256 hash of the public key, which means we can't reverse and obtain the public key simply based off the address itself.

In order to obtain the public key, we search the [ropsten explorer](https://ropsten.etherscan.io/address/0x92b28647ae1f3264661f72fb2eb9625a89d88a31) to obtain more information regarding the owner address, and we see that the address has sent a transaction with transaction hash [0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb](https://ropsten.etherscan.io/tx/0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb).

Using this transaction hash, we are able to obtain the public key, using a code snippet from this link [here](https://ethereum.stackexchange.com/questions/78815/ethers-js-recover-public-key-from-contract-deployment-via-v-r-s-values)

1. Deploy the contract and note the contract address
2. Determine the public key using this [code snippet](./solution.js), which then interacts with the smart contract via the authenticate function using the obtained public key to solve the challenge
