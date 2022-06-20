const { ethers } = require("ethers");
const ABI = require("./ABI.json");
const provider = new ethers.providers.JsonRpcProvider(
    "http://awesome.chall.seetf.sg:40002"
);
const contractAddress = "0xaa457A28E76c2A48E064b7A58b2bD10734312a9F";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = "REDACTED";
const wallet = new ethers.Wallet(privateKey, provider)
const contractWithSigner = contract.connect(wallet);
const contractInteraction = async() => {
    overrides = {
        gasLimit: 100000
    }
    const tx = await contractWithSigner.setWelcomeMessage("Welcome to SEETF", overrides);
    const secondtx = await contract.isSolved();
    console.log(secondtx);
}

contractInteraction();