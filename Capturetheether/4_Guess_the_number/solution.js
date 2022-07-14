const { ethers } = require("ethers");
const ABI = require("./ABI.json");
require("dotenv").config();

let provider = ethers.getDefaultProvider("ropsten");
const contractAddress = "0x7423720452B9dBE52375fBc29d1a754E30a64C3b";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const overrides = {
        value: ethers.utils.parseEther("1")
    }
    const tx = await contractWithSigner.guess(42, overrides);
    provider.waitForTransaction(tx.hash);
    const secondTx = await contractWithSigner.isComplete();
    provider.waitForTransaction(secondTx.hash);
    console.log(secondTx);
}

contractInteraction();
