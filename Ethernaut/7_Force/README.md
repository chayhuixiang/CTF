# Force (Level 7)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x22699e6AdD7159C3C385bf4d7e1C647ddB3a99ea)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}
```

## Solution

The Force contract is empty and there is no code running within it.

To forcefully send ether to the contract, we can use the selfdestruct function of another contract, which selfdestructs and forcefully sends its entire contract balance to the targetted address.

1. Deploy the [Exploit](./Exploit.sol) contract with a balance of >0.0001 ether

2. Call the attack function to selfdestruct the contract and forcefully send its balance to the target contract
