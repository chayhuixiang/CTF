# Donation (Math)

## CATEGORY

Smart Contracts

## Challenge

A candidate you don’t like is accepting campaign contributions via the smart contract below.

To complete this challenge, steal the candidate’s ether.

```
pragma solidity ^0.4.21;

contract DonationChallenge {
    struct Donation {
        uint256 timestamp;
        uint256 etherAmount;
    }
    Donation[] public donations;

    address public owner;

    function DonationChallenge() public payable {
        require(msg.value == 1 ether);
        
        owner = msg.sender;
    }
    
    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function donate(uint256 etherAmount) public payable {
        // amount is in ether, but msg.value is in wei
        uint256 scale = 10**18 * 1 ether;
        require(msg.value == etherAmount / scale);

        Donation donation;
        donation.timestamp = now;
        donation.etherAmount = etherAmount;

        donations.push(donation);
    }

    function withdraw() public {
        require(msg.sender == owner);
        
        msg.sender.transfer(address(this).balance);
    }
}
```

## Solution

There are multiple things that are exploitable in this contract. For one, the scale is incorrect. 1 ether = 10^18, so the additional 10**18 is unnecessary. 

Secondly, reconnaissance of the storage variables of the contract reveals that the etherAmount somehow overwrites the owner variable.

Hence, we have to send an etherAmount that is equal to our own contract address in uint

1. Deploy the contract instance and note down the contract address
2. Send a donation equal to our own wallet address (this is achieved via the attack() function in the [exploit](./solution.js) script)
