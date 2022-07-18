const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

const provider = ethers.providers.getDefaultProvider("rinkeby");
const contractAddress = "0x18F03C4eD9907798243481d1f03Cb0B69dA61C37";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const contractInteraction = async() => {
    const tx = await contractWithSigner.Fal1out();
    await provider.waitForTransaction(tx.hash);
    const address = await contractWithSigner.owner();
    console.log(address);
}

contractInteraction();
