const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("rinkeby");

const contractAddress = "0x9990A506bF6ddDe7C84e9f5D8a1B22Ec33B9E99C";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async() => {
    let key;
    for (let i = 0; i<7; i++) {
        const result = await provider.getStorageAt(contractAddress, i);
        console.log(`At Storage ${i}: ${result}`);
        if (i = 4) {
            key = ethers.utils.hexDataSlice(result, 0, 16);
            console.log(`key: ${key}`);
        }
    }
}
// contractInteraction();

const unlock = async() => {
    const key = "0xeda37f8946cd4791917a0b865f5f8498";
    const tx = await contractWithSigner.unlock(key);
    await provider.waitForTransaction(tx.hash);
    const completed = await contractWithSigner.locked();
    console.log(!completed);
}
unlock();
