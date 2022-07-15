const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("ropsten");

const contractAddress = "0x11Df3e722d43469f563df0Ab0b36283AAC541718";
const contractInteraction = async () => {
    const result = await provider.getStorageAt(contractAddress, 0);
    console.log(result);
}

contractInteraction();
