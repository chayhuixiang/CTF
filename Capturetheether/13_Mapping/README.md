## Mapping (Math)

## CATEGORY

Smart Contracts

## Challenge

Who needs mappings? I’ve created a contract that can store key/value pairs using just an array.

```
pragma solidity ^0.4.21;

contract MappingChallenge {
    bool public isComplete;
    uint256[] map;

    function set(uint256 key, uint256 value) public {
        // Expand dynamic array as needed
        if (map.length <= key) {
            map.length = key + 1;
        }

        map[key] = value;
    }

    function get(uint256 key) public view returns (uint256) {
        return map[key];
    }
}
```

## Solution

Inspecting the source code reveals that the contract is vulnerable to array overflow.

We determine the location in storage where the array and the isComplete variables are located at, then set the value of the index at the array corresponding to the address where isComplete is stored at to 1, to set the value of isComplete to true.

1. Deploy the contract and note down the address of the vulnerable contract
2. Run the [exploit](./exploit.js) script to determine the address to write to
3. Convert the hex values to decimal using an [online converter](https://www.rapidtables.com/convert/number/hex-to-decimal.html)
4. We find out that the index to write to the array is 35707666377435648211887908874984608119992236509074197713628505308453184860938
5. Inside remix, call the set function of the contract, with arg1 = 35707666377435648211887908874984608119992236509074197713628505308453184860938 and arg2 = 1
