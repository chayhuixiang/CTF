const { ethers } = require("ethers");
const oneEther = ethers.utils.parseEther("1");
const overflowNum = ethers.constants.MaxUint256.div(oneEther).add(1);
console.log(overflowNum.mul(oneEther).sub(ethers.constants.MaxUint256).sub(1).toString());
