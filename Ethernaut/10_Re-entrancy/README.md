# Re-entrancy (Level 10)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0xe6BA07257a9321e755184FB2F995e0600E78c16D)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}
```

## Solution

As given in the challenge title, the contract is vulnerable to re-entrancy attacks, as the contract sends ether to the user, before the balance within the contract is updated. This means that an attacker contract can continuously call the withdraw function of the contract and continuously retrieve funds from the contract

1. Deploy the [attacker](./Exploit.sol) contract
2. Using a secondary account, make a donation to the attacker contract address
3. Call the attack function of the attacker contract. This will call the withdraw function of the contract, and before the balances are updated, the fallback function of the attacker contract will be triggered, which will again call the withdraw function of the contract before the balances are updated, passing the if check
4. Call the withdraw function of the attacker contract to retrieve the funds
