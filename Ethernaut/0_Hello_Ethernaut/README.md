# Hello Ethernaut (Level 0)

## CATEGORY

Smart Contracts

## Challenge

Challenge prompt can be found [here](https://ethernaut.openzeppelin.com/level/0x4E73b858fD5D7A5fc1c3455061dE52a53F35d966)

## Solution

1. Follow the steps in the page and deploy the contract
2. Contract abi can be extracted via await contract.abi
3. Inspecting the abi reveals interesting methods and properties of the contract
4. await contract.info() reveals 

```
Try info2(), but with "hello" as a parameter.
```
5. await contract.info2("hello") reveals
```
The property infoNum holds the number of the next info method to call.
```
6. await contract.infoNum() reveals the number 42
7. await contract.info42() reveals
```
theMethodName is the name of the next method.
```
8. await contract.theMethodName() reveals
```
The method name is method7123949
```
9. await contract.method7123949() reveals
```
If you know the password, submit it to authenticate().
```
10. await contract.password() reveals
```
ethernaut0
```
11. Finally, to clear the level, we do await contract.authenticate("ethernaut0")
