# Predict the future (Lotteries)

## CATEGORY

Smart Contracts

## Challenge

This time, you have to lock in your guess before the random number is generated. To give you a sporting chance, there are only ten possible answers.

Note that it is indeed possible to solve this challenge without losing any ether.

```
pragma solidity ^0.4.21;

contract PredictTheFutureChallenge {
    address guesser;
    uint8 guess;
    uint256 settlementBlockNumber;

    function PredictTheFutureChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(uint8 n) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = n;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

## Solution

Inspecting the source code of the contract reveals that the guess is made first. When the settle function is called the random number is generated on the fly and then compared to the guess. The way to solve this is to predetermine a value for the guess, and then call the contract when and only when the blockhash and timestamp matches the guess variable. NOTE: we have to call both the settle and guess functions with our contract since the vulnerable contract checks if the transaction senders for both functions are the same address.

1. Deploy the contract and note the address of the deployed contract
2. Deploy the [exploit](/Capturetheether/8_Predict_the_future/Exploit.sol) contract with Remix, passing in the address of the vulnerable contract via the constructor
3. Call the lockInGuess function via the exploit contract, to lock in our exploit contract address as the guesser, and lock in the guessed number
4. Repeatedly invoke the solve function of our exploit contract, which checks whether the blockhash and timestamp match the guess number, and calls the settle function of the vulnerable contract when the blockhash and timestamp matches. We can check remix to see for events emitted to check whether the settle function was invoked

NOTE: [info.js](./info.js) is for debugging the guess and address variables stored inside the contract, [transactioninfo.js](./transactionInfo.js) is for getting more information regarding the sent transaction
