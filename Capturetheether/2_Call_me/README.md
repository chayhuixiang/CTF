# Call me (Warmup)

## CATEGORY

Smart Contracts

## Challenge

To complete this challenge, all you need to do is call a function.

The “Begin Challenge” button will deploy the following contract:

```
pragma solidity ^0.4.21;

contract CallMeChallenge {
    bool public isComplete = false;

    function callme() public {
        isComplete = true;
    }
}
```

Call the function named callme and then click the “Check Solution” button.

## Solution

Refer to the [ethers](https://docs.ethers.io/v5/) documentation on how to invoke a contract.

1. Connect to Ropsten via JSONRPC
2. Deploy the contract from the UI and note down the address
3. Invoke the callme function from the contract using the [script](/Capturetheether/2_Call_me/solution.js)
