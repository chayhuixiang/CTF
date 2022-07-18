# Token (Level 5)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x63bE8347A617476CA461649897238A31835a32CE)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}
```

## Solution

Inspecting the contract, we realise that the transfer method of the contract is flawed.

```
require(balances[msg.sender] - _value >= 0)
```
The check above is vulnerable to an underflow attack. If the provided value is larger than the balance of the sender, the difference will simply underflow to the uint limit, and the require statement will always pass.

As a result `balances[msg.sender] -= _value` will underflow to the uint limit if the provided value is larger than the balance of the sender, resulting in a large token balance for the sender.

1. Call transfer("any arbitrary address", 21) on the contract
