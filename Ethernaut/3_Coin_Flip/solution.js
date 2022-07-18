const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("rinkeby");
const contractAddress = "0xBB1e304B964Cb1f0951EA0010628Aa3c6f761D7e";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const delay = (delayms) => {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delayms);
    })
}

const contractInteraction = async() => {
    for (let i = 0; i < 10; i++) {
        console.log(`Sending transaction ${i+1}`);
        const tx = await contractWithSigner.attack();
        await provider.waitForTransaction(tx.hash);
        await delay(10000);
    }
    console.log("Done!");
};

contractInteraction();
