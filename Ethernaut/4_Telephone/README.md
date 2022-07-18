# Telephone (Level 4)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x0b6F6CE4BCfB70525A31454292017F640C10c768)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}
```

## Solution

Inspecting the contract reveals that the owner can be changed only if `tx.origin != msg.sender`, which can be achieved by calling an intermediate contract. In that case, tx.origin will be our own wallet address, while msg.sender will be the address of the intermediate contract.

1. Deploy the attacker contract and call the attack function of the contract with our own wallet
