const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

const provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0x5E48bdd28B65f0c5f730502825E457A2d6588d07";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const privateKey2 = process.env.PRIVATEKEY2;
const wallet2 = new ethers.Wallet(privateKey2, provider);

const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const approveTx = await contractWithSigner.approve(wallet2.address, ethers.constants.MaxUint256);
    await provider.waitForTransaction(approveTx.hash);
    console.log("done!");
};

contractInteraction();
