# Predict the block hash (Lotteries)

## CATEGORY

Smart Contracts

## Challenge

Guessing an 8-bit number is apparently too easy. This time, you need to predict the entire 256-bit block hash for a future block.

```
pragma solidity ^0.4.21;

contract PredictTheBlockHashChallenge {
    address guesser;
    bytes32 guess;
    uint256 settlementBlockNumber;

    function PredictTheBlockHashChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function lockInGuess(bytes32 hash) public payable {
        require(guesser == 0);
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = hash;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        bytes32 answer = block.blockhash(settlementBlockNumber);

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

## Solution

The contract locks in a future block number when the lockinguess funciton is called, so we are unable to check for the blockhash of the function with another contract.

Instead we have to go with another approach.

Reading the documentation reveals that 
```
blockhash(uint blockNumber) returns (bytes32): hash of the given block when blocknumber is one of the 256 most recent blocks; otherwise returns zero
```

If the locked in block is not one of the 256 most recent blocks, the blockhash returns 0!

1. Deploy the vulnerable contract and note the deployed address
2. Call the lockInGuess function, passing in 0 (in bytes32 format) as the predicted hash, via the contractInteraction function inside the exploit [script](./solution.js), and note down the transaction block number
3. Check for the currently mined blocks using the [ropsten block explorer](https://ropsten.etherscan.io/)
4. Call the settle function when the number of blocks after the initial block exceeds 256, via the contractInteractionNext function inside the exploit script
