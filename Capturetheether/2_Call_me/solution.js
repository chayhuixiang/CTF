const { ethers } = require("ethers");
const ABI = require("./ABI.json");
require("dotenv").config()

let provider = ethers.getDefaultProvider("ropsten");
const contractAddress = "0x1b9c13D9eC243E930300e60b2b135DBd81F29b9c";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider)
const contractWithSigner = contract.connect(wallet);
const contractInteraction = async() => {
    const tx = await contractWithSigner.callme();
    await provider.waitForTransaction(tx.hash);
    const secondtx = await contractWithSigner.isComplete();
    await provider.waitForTransaction(secondtx.hash);
    console.log(secondtx);
}

contractInteraction();
