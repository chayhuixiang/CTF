# Vault (Level 8)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0xf94b476063B6379A3c8b6C836efB8B3e10eDe188)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) public {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}
```

## Solution

In order to unlock the vault, we have to find out the private password variable inside the contract.

To do so, we check slot1 of the contract, since password is stored in slot1, while the boolean locked is stored in slot0.

1. Execute the exploit [script](./solution.js) which queries for the password stored in slot1, and then sends the result as an argument to the unlock function
