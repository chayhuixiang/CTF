# Preservation (Level 16)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x97E982a15FbB1C28F6B8ee971BEc15C78b3d263F)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Preservation {

  // public library contracts 
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;
  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

  constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) public {
    timeZone1Library = _timeZone1LibraryAddress; 
    timeZone2Library = _timeZone2LibraryAddress; 
    owner = msg.sender;
  }
 
  // set the time for timezone 1
  function setFirstTime(uint _timeStamp) public {
    timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }

  // set the time for timezone 2
  function setSecondTime(uint _timeStamp) public {
    timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
}

// Simple library contract to set the time
contract LibraryContract {

  // stores a timestamp 
  uint storedTime;  

  function setTime(uint _time) public {
    storedTime = _time;
  }
}
```

## Solution

delegateCall basically borrows a function from another contract, and executes it in the context of the current context. Any variables updated in the called contract will instead update variables in the caller contract. In this case, the storedTime variable in the called LibraryContract exists in slot0, hence calling it from the Preservation contract will update the variable at slot0 (i.e timeZone1Library). 

To solve this challenge, we have to first deploy an [attacker](./Exploit.sol) contract that has the address at slot2 (which matches that of the owner variable in the Preservation contract). 

Then, we'll update the address of timeZone1Library to the address of the attacker contract, then call the setTime function in the attacker contract which updates the variable at slot2.

1. Deploy the attacker contract instance (note that the attacker contract has a function setTime which matches that of the Library Contract), and note down the attacker contract address
2. Call setSecondTime (raise the gas limit a little) with the attacker contract address in Remix to update the timeZone1Library address to the attacker contract address
3. Call setFirstTime which calls the attacker contract address in remix and sets the variable at slot 2 (owner variable) to tx.origin (our own wallet)
