# Alien Codex (Level 19)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0xda5b3Fb76C78b6EdEE6BE8F11a1c31EcfB02b272)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '../helpers/Ownable-05.sol';

contract AlienCodex is Ownable {

  bool public contact;
  bytes32[] public codex;

  modifier contacted() {
    assert(contact);
    _;
  }
  
  function make_contact() public {
    contact = true;
  }

  function record(bytes32 _content) contacted public {
  	codex.push(_content);
  }

  function retract() contacted public {
    codex.length--;
  }

  function revise(uint i, bytes32 _content) contacted public {
    codex[i] = _content;
  }
}
```

## Solution

The contract can be exploited by underflowing the codex length to the maximum length (uint256 limit), then overwrite the owner variable at the correct index of the underflowed codex array.

1. We first obtain the contract abi via contract.abi inside the console
2. We carry out some reconnaissance with the recon function inside the [exploit](./solution.js) script. This tells us that the owner variable is possibly stored at slot0, as bytes20 is stored at slot0
3. Using the owner() function from the contract, we can verify that the address is stored at slot0 as the variable returned from the owner() function matches the variable stored at slot0 (this is done by calling the checkOwner() function inside the exploit script)
4. We then set our own address to a contact via the contract make_contact function
5. This enables us to then underflow the codex array via the retract() function. We can also see the array length is now the uint256 limit from the variable at slot1
6. We can then calculate the address where the codex array starts, via a keccak hash, then determine the index of the codex array to overwrite the owner variable
7. The owner variable is then overwritten with our own wallet address
