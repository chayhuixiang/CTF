const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

const provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0x341adE2E0e360Cd0F23AD2166AD00eAe5585BD25";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    const overrides = {
        value: ethers.utils.parseEther("1")
    }
    const tx = await contractWithSigner.guess(overrides);
    await provider.waitForTransaction(tx.hash);
    const secondTx = await contractWithSigner.withdraw();
    await provider.waitForTransaction(secondTx.hash);
}

contractInteraction();
