const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0xf89C1A12a40D6d23DfD79F5C3982492f5e9911a4";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const overrides = {
        value: ethers.utils.parseEther("1")
    }
    const tx = await contractWithSigner.guess(0, overrides);
    await provider.waitForTransaction(tx.hash);
}

contractInteraction()
