# Delegation (Level 6)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x9451961b7Aea1Df57bc20CC68D72f662241b5493)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Delegate {

  address public owner;

  constructor(address _owner) public {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) public {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}
```

## Solution

Looking at the Delegation contract, calling the pwn() function in the delegation contract triggers the fallback function, which in turn then forwards the pwn() function call to the Delegate contract.

As the delegatecall is still executed within the context of the Delegation contract, overwriting `owner = msg.sender` inside Delegate will instead overwrite the owner inside the Delegation contract, as both owner variables are stored in the same slot.

1. Run the exploit [script](./solution.js) to send the pwn function as the data of the transaction

NOTE: for some reason the transaction fails when the gaslimit is not specified, so we specify a manual gas limit of 50000 gas
