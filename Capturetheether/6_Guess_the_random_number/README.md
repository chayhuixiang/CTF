# Guess the random number (Lotteries)

## CATEGORY

Smart Contracts

## Challenge

This time the number is generated based on a couple fairly random sources.

```
pragma solidity ^0.4.21;

contract GuessTheRandomNumberChallenge {
    uint8 answer;

    function GuessTheRandomNumberChallenge() public payable {
        require(msg.value == 1 ether);
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));
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

Inspecting the source code of the contract reveals that the random number is generated using a combination of random numbers and timestamp.

The random number is stored in an answer variable, which could be leaked using provider.getStorageAt()

1. Deploy the contract and note the address of the deployed contract
2. Run the exploit [script](/Capturetheether/6_Guess_the_random_number/exploit.js) and see the value of the answer variable in the console
3. We find out that the number is 0
4. Invoke the guess function of the deployed contract, attaching 1 ether to the transaction and setting 0 as the argument
