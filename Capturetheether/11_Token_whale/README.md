# Token Whale (Math)

## CATEGORY

Smart Contracts

## Challenge

This ERC20-compatible token is hard to acquire. There’s a fixed supply of 1,000 tokens, all of which are yours to start with.

Find a way to accumulate at least 1,000,000 tokens to solve this challenge.

```
pragma solidity ^0.4.21;

contract TokenWhaleChallenge {
    address player;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    string public name = "Simple ERC20 Token";
    string public symbol = "SET";
    uint8 public decimals = 18;

    function TokenWhaleChallenge(address _player) public {
        player = _player;
        totalSupply = 1000;
        balanceOf[player] = 1000;
    }

    function isComplete() public view returns (bool) {
        return balanceOf[player] >= 1000000;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);

    function _transfer(address to, uint256 value) internal {
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        emit Transfer(msg.sender, to, value);
    }

    function transfer(address to, uint256 value) public {
        require(balanceOf[msg.sender] >= value);
        require(balanceOf[to] + value >= balanceOf[to]);

        _transfer(to, value);
    }

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function approve(address spender, uint256 value) public {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
    }

    function transferFrom(address from, address to, uint256 value) public {
        require(balanceOf[from] >= value);
        require(balanceOf[to] + value >= balanceOf[to]);
        require(allowance[from][msg.sender] >= value);

        allowance[from][msg.sender] -= value;
        _transfer(to, value);
    }
}
```

## Solution

Examining the source code of the contract reveals a huge security flaw with the transferFrom function

```javascript
function transferFrom(address from, address to, uint256 value) public {
    require(balanceOf[from] >= value);
    require(balanceOf[to] + value >= balanceOf[to]);
    require(allowance[from][msg.sender] >= value);

    allowance[from][msg.sender] -= value;
    _transfer(to, value);
}
```
The transferFrom function allows any 3rd party wallet to transfer tokens on behalf of another wallet, as long as the wallet has given their approval for the 3rd party to handle their assets using the approve function.

The transferFrom function uses the _transfer function to transfer funds.

```javascript
function transfer(address to, uint256 value) public {
    require(balanceOf[msg.sender] >= value);
    require(balanceOf[to] + value >= balanceOf[to]);

    _transfer(to, value);
}
```
However, closer inspection of the _transfer function reveals that it deducts the balance of the transaction sender (3rd party wallet) instead of the wallet with balance in it. This means we can have the wallet with balance approve another 3rd party wallet to spend their tokens, then have the 3rd party continuously mint tokens by calling the transferFrom function, since the balance of the 3rd party wallet cannot be deducted, and the balance of the wallet with balance will continuously increase.

1. Deploy the vulnerable contract and note the contract address
2. Approve the 3rd party wallet by running the exploit [script](./solution.js)
3. Mint tokens by running the 2nd exploit [script](./solution2.js)
