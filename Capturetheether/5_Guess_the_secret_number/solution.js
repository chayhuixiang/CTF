const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0x5112cc53f07a973DCeff36bd19C7fD9C2dcc58d2";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const overrides = {
        value: ethers.utils.parseEther("1")
    }
    const tx = await contractWithSigner.guess(170, overrides);
    provider.waitForTransaction(tx.hash);
    const secondTx = await contractWithSigner.isComplete();
    provider.waitForTransaction(secondTx.hash);
    console.log(secondTx);
}

contractInteraction();
