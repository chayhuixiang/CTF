const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("ropsten");

const contractInteraction = async () => {
    const tx = await provider.getTransaction("0x3e45ef51b2a0077febb73a07b8ce57a3679090cc66a1bc06cc7e80bca3b932aa");
    console.log(tx);
    const receipt = await provider.getTransactionReceipt("0x3e45ef51b2a0077febb73a07b8ce57a3679090cc66a1bc06cc7e80bca3b932aa");
    console.log(receipt);
}

contractInteraction();
