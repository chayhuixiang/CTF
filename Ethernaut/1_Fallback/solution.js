const { ethers } = require("ethers");
const ABI = require("./ABI.json");
require("dotenv").config();

const provider = ethers.providers.getDefaultProvider("rinkeby");
const contractAddress = "0x22f5ac1b0f460dc4c9Da9A01DeFEdB3A42A54a8e";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async () => {
    console.log("--- CALLING CONTRIBUTE FUNCTION ---");
    const contributeOverrides = {
        value: ethers.utils.parseEther("0.0001")
    }
    const contribute = await contractWithSigner.contribute(contributeOverrides);
    await provider.waitForTransaction(contribute.hash);
    console.log("--- CONTRIBUTE FUNCTION CALLED ---");

    console.log("--- SENDING ETHER ---");
    const sendEther = await wallet.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther("0.0001")
    });
    await provider.waitForTransaction(sendEther.hash);
    console.log("--- ETHER SENT ---");

    console.log("--- CALLING WITHDRAW FUNCTION ---");
    const withdraw = await contractWithSigner.withdraw();
    await provider.waitForTransaction(withdraw.hash);
    console.log("--- WITHDRAW FUNCTION CALLED ---");
};

contractInteraction();
