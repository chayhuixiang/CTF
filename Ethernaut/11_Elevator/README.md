# Elevator (Level 11)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0xaB4F3F2644060b2D960b0d88F0a42d1D27484687)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
```

## Solution

The goTo function of the vulnerable contract calls the `isLastFloor` function twice. Hence, we just need to make sure that the isLastFloor function in our attacker contract returns false the first time it is called, then true the second time it is called.

1. Deploy the [attacker](./Exploit.sol) contract
2. Call the goTo function of the attacker contract with any uint (doesn't matter)
