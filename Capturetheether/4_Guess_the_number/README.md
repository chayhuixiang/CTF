# Choose a nickname (Warmup)

## CATEGORY

Smart Contracts

## Challenge

I’m thinking of a number. All you have to do is guess it.

```
pragma solidity ^0.4.21;

contract GuessTheNumberChallenge {
    uint8 answer = 42;

    function GuessTheNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```


## Solution

Inspecting the source code of the contract reveals that the answer is 42.

1. Deploy the contract and note the address of the deployed contract
2. Invoke the guess function of the deployed contract, with the first argument set to 42, as well as with 1 ether sent along with the transaction
