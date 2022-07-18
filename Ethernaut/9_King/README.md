# Vault (Level 9)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x43BA674B4fbb8B157b7441C2187bCdD2cdF84FD5)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}
```

## Solution

As we can see from this [transaction](https://rinkeby.etherscan.io/tx/0x07a197aa6dbd1df6311a2f7138aa05751b449fd55b47baca4c176721e19ff9b6), after we submit the instance, the contract owner will send 0 ether to the contract to overwrite the king.

Whenever the contract owner tries to send 0 ether to overwrite the king, this block of code is executed.
```
  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }
```

However, if the current king is our deployed smart contract instance, after the contract calls `king.transfer()`, we can have our own contract send more ether to the contract to re-overwrite the king, via the fallback function.

The full solidity code can be found [here](./Exploit.sol)

1. Deploy the attacker contract, with the address of the king contract 
2. Call the attack function of the attack contract, initialise the king to our attacker contract
3. Submit the instance, which will attempt to overwrite the king, but with our fallback entrant function, we will be able to re-overwrite the king with our smart contract instance

NOTE: the attack function in our contract must use .call instead of .transfer or .send to transfer the funds to the king contract or else there will be insuffient gas
