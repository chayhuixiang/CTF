const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

const provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0x51768ab53A0A6aa18bFB59052B5280a4B979D597";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const guess = ethers.utils.hexZeroPad(0, 32);
    const overrides = {
        value: ethers.utils.parseEther("1")
    }
    const tx = await contractWithSigner.lockInGuess(guess, overrides);
    await provider.waitForTransaction(tx.hash);
    const txDetails = await provider.getTransaction(tx.hash);
    const blockNumber = txDetails.blockNumber;
    console.log(`Done with blocknumber ${blockNumber}`);
}

const contractInteractionNext = async () => {
    const tx = await contractWithSigner.settle();
    await provider.waitForTransaction(tx.hash);
}

// contractInteraction();
contractInteractionNext();
