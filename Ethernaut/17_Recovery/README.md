# Recovery (Level 17)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x0EB8e4771ABA41B70d0cb6770e04086E5aee5aB2)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Recovery {

  //generate tokens
  function generateToken(string memory _name, uint256 _initialSupply) public {
    new SimpleToken(_name, msg.sender, _initialSupply);
  
  }
}

contract SimpleToken {

  using SafeMath for uint256;
  // public variables
  string public name;
  mapping (address => uint) public balances;

  // constructor
  constructor(string memory _name, address _creator, uint256 _initialSupply) public {
    name = _name;
    balances[_creator] = _initialSupply;
  }

  // collect ether in return for tokens
  receive() external payable {
    balances[msg.sender] = msg.value.mul(10);
  }

  // allow transfers of tokens
  function transfer(address _to, uint _amount) public { 
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] = balances[msg.sender].sub(_amount);
    balances[_to] = _amount;
  }

  // clean up after ourselves
  function destroy(address payable _to) public {
    selfdestruct(_to);
  }
}
```

## Solution

The token creator lost the address of the token contract, but we can easily find the token contract inside etherscan: [link](https://rinkeby.etherscan.io/address/0x9dE78e9981978979fC0e9bB3CeF2b8bbA7dC9f42#internaltx)

Scrolling to the internal txns tab shows us all token creation transactions, and with that we can find the token contract created, and destroy the token contract

1. Find the address of the token contract inside etherscan, using the transaction hash of the contract deployment
2. Call the destroy function of the token contract, and pass in our wallet address 
