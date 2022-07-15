# Guess the new number (Lotteries)

## CATEGORY

Smart Contracts

## Challenge

The number is now generated on-demand when a guess is made.

```
pragma solidity ^0.4.21;

contract GuessTheNewNumberChallenge {
    function GuessTheNewNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

## Solution

Inspecting the source code of the contract reveals that the random number is generated using a combination of random numbers and timestamp.

However, unlike the previous challenge where the random number and the guessing step are executed in 2 different functions, the random number is generated on demand when a guess is made.

We have to determine the blockhash and the timestamp at the time of the transaction.

To determine these variables, we create another contract, calculate these variables with our exploit contract, then call the vulnerable contract with the calculated variables.

1. Deploy the contract and note the address of the deployed contract
2. Deploy the [exploit](/Capturetheether/7_Guess_the_new_number/Exploit.sol) contract with Remix, passing in the address of the vulnerable contract via the constructor
3. Invoke the guess function of the vulnerable contract with the guess function of our exploit contract, passing in the calculated hash from our contract as the guess argument
