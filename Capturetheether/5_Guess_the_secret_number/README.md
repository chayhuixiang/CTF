# Guess the secret number (Lotteries)

## CATEGORY

Smart Contracts

## Challenge

Putting the answer in the code makes things a little too easy.

This time I’ve only stored the hash of the number. Good luck reversing a cryptographic hash!

```
pragma solidity ^0.4.21;

contract GuessTheSecretNumberChallenge {
    bytes32 answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;

    function GuessTheSecretNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }
    
    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (keccak256(n) == answerHash) {
            msg.sender.transfer(2 ether);
        }
    }
}
```


## Solution

Inspecting the source code of the contract reveals that the answer is stored in a keccak256 answerHash.

To find out the number that corresponds to this answerHash, we can bruteforce the solution using the [keccak256 utils](https://docs.ethers.io/v5/api/utils/hashing/) provided by ethers.

1. Deploy the contract and note the address of the deployed contract
2. Run the bruteforce [script](/Capturetheether/5_Guess_the_secret_number/bruteforce.js) to determine the number
3. We find out that the number is 170
4. Invoke the guess function of the deployed contract, attaching 1 ether to the transaction and setting 170 as the argument
