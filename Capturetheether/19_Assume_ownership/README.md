# Token Whale (Math)

## CATEGORY

Smart Contracts

## Challenge

To complete this challenge, become the owner.

```
pragma solidity ^0.4.21;

contract AssumeOwnershipChallenge {
    address owner;
    bool public isComplete;

    function AssumeOwmershipChallenge() public {
        owner = msg.sender;
    }

    function authenticate() public {
        require(msg.sender == owner);

        isComplete = true;
    }
}
```

## Solution

The constructor function of the contract was misspelt as AssumeOwmershipChallenge instead of AssumeOwnershipChallenge.

As a result the function acts as a normal function instead of a constructor function.

1. Deploy the vulnerable contract and note the contract address
2. Call the AssumeOwmershipChallenge function and the authenticate function using the exploit [script](./solution.js)
