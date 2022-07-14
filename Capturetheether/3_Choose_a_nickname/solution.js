const { ethers } = require("ethers");
const ABI = require("./ABI.json");
require("dotenv").config()

let provider = ethers.getDefaultProvider("ropsten");
const cteContractAddress = "0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee";
const contract = new ethers.Contract(cteContractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider)
const contractWithSigner = contract.connect(wallet);
const input = "Sqweedy";
let byteInput = ethers.utils.formatBytes32String(input);

const contractInteraction = async() => {
    const tx = await contractWithSigner.setNickname(byteInput);
    await provider.waitForTransaction(tx);
}

contractInteraction();
