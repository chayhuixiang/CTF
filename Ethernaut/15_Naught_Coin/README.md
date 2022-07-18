# Naught Coin (Level 15)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x096bb5e93a204BfD701502EB6EF266a950217218)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

 contract NaughtCoin is ERC20 {

  // string public constant name = 'NaughtCoin';
  // string public constant symbol = '0x0';
  // uint public constant decimals = 18;
  uint public timeLock = now + 10 * 365 days;
  uint256 public INITIAL_SUPPLY;
  address public player;

  constructor(address _player) 
  ERC20('NaughtCoin', '0x0')
  public {
    player = _player;
    INITIAL_SUPPLY = 1000000 * (10**uint256(decimals()));
    // _totalSupply = INITIAL_SUPPLY;
    // _balances[player] = INITIAL_SUPPLY;
    _mint(player, INITIAL_SUPPLY);
    emit Transfer(address(0), player, INITIAL_SUPPLY);
  }
  
  function transfer(address _to, uint256 _value) override public lockTokens returns(bool) {
    super.transfer(_to, _value);
  }

  // Prevent the initial owner from transferring tokens until the timelock has passed
  modifier lockTokens() {
    if (msg.sender == player) {
      require(now > timeLock);
      _;
    } else {
     _;
    }
  } 
} 
```

## Solution

ERC20 comes with an approval system whereby other accounts are able to spend your tokens for you. All that we need to do is to have 2 accounts - one holding all the tokens (account 1) and one to spend the tokens

Account 1 will firstly give approval for Account 2 to spend all their tokens. Then Account 2 will transfer all account 1's tokens from 1 to 2 on account 1's behalf

1. Call the approve method of the contract with account 1, passing in the address of account 2, and the uint256 limit
2. Call the transferFrom method of the contract with account 2, passing in the address of both accounts, as well as the balance of the token
