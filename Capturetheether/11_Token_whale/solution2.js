const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("ropsten");
provider = new ethers.providers.JsonRpcProvider(
    "https://ropsten.infura.io/v3/27329cef779644bbb38f91c985e66b9e"
);
const contractAddress = "0x5E48bdd28B65f0c5f730502825E457A2d6588d07";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const privateKey2 = process.env.PRIVATEKEY2;
const wallet2 = new ethers.Wallet(privateKey2, provider);

const contractWithSigner = contract.connect(wallet2);

const contractInteraction = async (balance) => {
    const tx = await contractWithSigner.transferFrom(wallet.address, wallet.address, balance);
    await provider.waitForTransaction(tx.hash);
    console.log("done!");
};

const loop = async() => {
    let balance = ethers.BigNumber.from("0");
    let count = 0
    while (balance.lt(ethers.BigNumber.from("1000000"))) {
        balance = await contractWithSigner.balanceOf(wallet.address);
        console.log(`Executing Transaction ${count} with balance ${balance.toNumber()}`);
        await contractInteraction(balance);
        count++;
    }
    console.log("done!");
}

loop();

//0x8ba0403F98849AAA16CB9fb12160cf15cC8Fe6B1
//0xaDAbE010873c9707CAe8B1D041C2CE471c5DaD50
