const { ethers } = require("ethers");
const ABI = require("./ABI.json");
const provider = new ethers.providers.JsonRpcProvider(
    "http://awesome.chall.seetf.sg:40002"
);
const contractAddress = "0xD08f23B6ea6694DF749a08c5025FC5316F31bFD9";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);
// const contractWithSigner = contract.connect(wallet);
const contractInteraction = async() => {
    overrides = {
        gasLimit: 100000
    }
    let balanceAmount = await contract.balanceAmount();
    console.log(`balanceAmount: ${balanceAmount}`);
}

contractInteraction();
