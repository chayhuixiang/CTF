const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0xE911168AaB6c26B6AF20763391C69B046f656aB8";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const tx = await contractWithSigner.solve()
    await provider.waitForTransaction(tx.hash);
}

contractInteraction();
