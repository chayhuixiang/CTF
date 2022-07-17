const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

const provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0x85910A914DF19C17b8ED27BB9853ac82e88AA84e";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const contractInteraction = async() => {
    const transferOwnership = await contractWithSigner.AssumeOwmershipChallenge();
    await provider.waitForTransaction(transferOwnership.hash);
    const authenticate = await contractWithSigner.authenticate();
    await provider.waitForTransaction(authenticate.hash);
    console.log("Done!");
    console.log(await contractWithSigner.isComplete());
};

contractInteraction();
