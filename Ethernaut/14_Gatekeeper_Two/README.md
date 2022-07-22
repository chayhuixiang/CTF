# Gatekeeper Two (Level 14)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0xdCeA38B2ce1768E1F409B6C65344E81F16bEc38d)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GatekeeperTwo {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    uint x;
    assembly { x := extcodesize(caller()) }
    require(x == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1);
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
```

## Solution

To bypass gateOne, we have to interact with the gate contract through an intermediate contract, such that tx.origin(our own wallet) != msg.sender(intermediate contract)

To bypass gateTwo, we have to lump all our code logic within the constructor function, in that case the size of the contract = 0

To bypass gateThree, we have to XOR the uint64 representation of the contract address with the uint64 integer limit, to get the gatekey

1. Deploy the [attacker](./Exploit.sol) contract
