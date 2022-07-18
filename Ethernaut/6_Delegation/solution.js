const { ethers } = require("ethers");
require("dotenv").config();

let provider = ethers.providers.getDefaultProvider("rinkeby");
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = "0x11938d78e1317261Fe755aCC487Bf274E3F3584E";
let ABI = ["function pwn()"];
let iface = new ethers.utils.Interface(ABI);
const selector = iface.encodeFunctionData("pwn");
console.log(selector);

const tx = {
    to: contractAddress,
    data: selector,
    gasLimit: ethers.BigNumber.from("50000"),
}

const contractInteraction = async () => {
    const txResponse = await wallet.sendTransaction(tx);
    console.log("--- INTERACTION DONE ---");
    console.log(txResponse);
}

contractInteraction()
