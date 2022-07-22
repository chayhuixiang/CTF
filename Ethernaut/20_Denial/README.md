# Denial (Level 20)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0xf1D573178225513eDAA795bE9206f7E311EeDEc3)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Denial {

    using SafeMath for uint256;
    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address payable public constant owner = address(0xA9E);
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances

    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    // withdraw 1% to recipient and 1% to owner
    function withdraw() public {
        uint amountToSend = address(this).balance.div(100);
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        partner.call{value:amountToSend}("");
        owner.transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = now;
        withdrawPartnerBalances[partner] = withdrawPartnerBalances[partner].add(amountToSend);
    }

    // allow deposit of funds
    receive() external payable {}

    // convenience function
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
```

## Solution

This challenge was supposed to be solved by draining all the guess from the withdraw contract call, but instead I went for a reentrancy approach. When the contract calls `partner.call` we are able to continuously recall the withdraw function, causing the function execution to continuously loop until it runs out of gas. 

1. Deploy the [attacker](./Exploit.sol) contract
2. Call the setWithdrawPartner function of the contract, which sets the partner of the vulnerable contract to the attacker contract
3. Submit the instance, which will trigger the withdraw function of the contract, and trigger the reentrancy attack
