# Token Sale (Lotteries)

## CATEGORY

Smart Contracts

## Challenge

This token contract allows you to buy and sell tokens at an even exchange rate of 1 token per ether.

The contract starts off with a balance of 1 ether. See if you can take some of that away.

```
pragma solidity ^0.4.21;

contract TokenSaleChallenge {
    mapping(address => uint256) public balanceOf;
    uint256 constant PRICE_PER_TOKEN = 1 ether;

    function TokenSaleChallenge(address _player) public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance < 1 ether;
    }

    function buy(uint256 numTokens) public payable {
        require(msg.value == numTokens * PRICE_PER_TOKEN);

        balanceOf[msg.sender] += numTokens;
    }

    function sell(uint256 numTokens) public {
        require(balanceOf[msg.sender] >= numTokens);

        balanceOf[msg.sender] -= numTokens;
        msg.sender.transfer(numTokens * PRICE_PER_TOKEN);
    }
}
```

## Solution

The statement `require(msg.value == numTokens * PRICE_PER_TOKEN)` is vulnerable to a math attack, as numTokens * PRICE_PER_TOKEN can be easily overflown.

PRICE_PER_TOKEN is currently set to 1 ether (1e^18), so setting numTokens such that the product is over the uint256 limit is possible.

1. Run the [test](./test.js) script to determine the amount of wei to send and the numToken value to overflow. 
2. Call the buy function with the pre-determined amount of wei to send and pass in the appropriate numToken value
3. Call the sell function, setting numToken to 1 to drain ether from the contract
