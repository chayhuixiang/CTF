# Fallback (Level 1)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x9CB391dbcD447E645D6Cb55dE6ca23164130D008)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Fallback {

  using SafeMath for uint256;
  mapping(address => uint) public contributions;
  address payable public owner;

  constructor() public {
    owner = msg.sender;
    contributions[msg.sender] = 1000 * (1 ether);
  }

  modifier onlyOwner {
        require(
            msg.sender == owner,
            "caller is not the owner"
        );
        _;
    }

  function contribute() public payable {
    require(msg.value < 0.001 ether);
    contributions[msg.sender] += msg.value;
    if(contributions[msg.sender] > contributions[owner]) {
      owner = msg.sender;
    }
  }

  function getContribution() public view returns (uint) {
    return contributions[msg.sender];
  }

  function withdraw() public onlyOwner {
    owner.transfer(address(this).balance);
  }

  receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
}
```

## Solution

Reading the challenge prompt reveals that we have to somehow claim ownership of the contract, and then call the withdraw function to withdraw all the balance of the contract.

In order to do so, we send ether to the contract, which calls the receive function of the contract, and sets our address to the owner.

However, in order to call the receive function, we have to make a contribution to the contract first, or else we will fail the `require(contributions[msg.sender] > 0)` part.

Running the [exploit script](./solution.js) we accomplish the following in order:

1. Call the contribute function, sending 0.0001 ether to the function call to pass the require check of the contribute function
2. Send ether to the contract, which sets our address to the owner
3. Call the withdraw function
