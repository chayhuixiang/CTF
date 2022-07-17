# Token Whale (Math)

## CATEGORY

Smart Contracts

## Challenge

This retirement fund is what economists call a commitment device. I’m trying to make sure I hold on to 1 ether for retirement.

I’ve committed 1 ether to the contract below, and I won’t withdraw it until 10 years have passed. If I do withdraw early, 10% of my ether goes to the beneficiary (you!).

I really don’t want you to have 0.1 of my ether, so I’m resolved to leave those funds alone until 10 years from now. Good luck!

```
pragma solidity ^0.4.21;

contract RetirementFundChallenge {
    uint256 startBalance;
    address owner = msg.sender;
    address beneficiary;
    uint256 expiration = now + 10 years;

    function RetirementFundChallenge(address player) public payable {
        require(msg.value == 1 ether);

        beneficiary = player;
        startBalance = msg.value;
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function withdraw() public {
        require(msg.sender == owner);

        if (now < expiration) {
            // early withdrawal incurs a 10% penalty
            msg.sender.transfer(address(this).balance * 9 / 10);
        } else {
            msg.sender.transfer(address(this).balance);
        }
    }

    function collectPenalty() public {
        require(msg.sender == beneficiary);

        uint256 withdrawn = startBalance - address(this).balance;

        // an early withdrawal occurred
        require(withdrawn > 0);

        // penalty is what's left
        msg.sender.transfer(address(this).balance);
    }
}
```

## Solution

Examining the source code of the contract reveals a huge security flaw with the collectPenalty function.

```javascript
function collectPenalty() public {
    require(msg.sender == beneficiary);

    uint256 withdrawn = startBalance - address(this).balance;

    // an early withdrawal occurred
    require(withdrawn > 0);

    // penalty is what's left
    msg.sender.transfer(address(this).balance);
}
```

To determine whether the owner has withdrawn from the contract, the contract takes the difference between the starting balance and the current balance. 

If we were to somehow artifically increase the balance of the contract, this would cause the balance of the contract to be greater than the starting balance, resulting in a uint overflow, and withdrawn > 0.

To artificially increase the balance of the contract, we deploy an attacker contract that forcefully sends ether to the vulnerable contract using the selfdestruct function

1. Deploy the vulnerable contract and note the contract address
2. Deploy the attacker contract, passing in the vulnerable contract address as the contructor
3. Call the attack function of the attacker contract, which self destructs and forcefully sends ether to the vulnerable contract
4. The vulnerable contract now has 1.5 ether, and withdrawn will be > 0 when calculated
5. Call the collectPenalty function of the vulnerable contract
