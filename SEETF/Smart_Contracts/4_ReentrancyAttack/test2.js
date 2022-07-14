const { ethers, BigNumber } = require("ethers");
const Web3 = require("web3");
const web3 = new Web3();

const ABI = require("./ABIInterface.json");
const provider = new ethers.providers.JsonRpcProvider(
    "http://awesome.chall.seetf.sg:40002"
);
const contractAddress = "0xd5B9d9d85f1D86441A37C19f5E9bB43CC32F2c4f";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = "REDACTED"
const wallet = new ethers.Wallet(privateKey, provider)
const contractWithSigner = contract.connect(wallet);

const contractInteraction = async() => {
    overrides = {
        value: ethers.utils.parseEther("1")
    }

    // const tx =  await contractWithSigner.play(overrides);
    // const tx = await contractWithSigner.resultsReveal();
    // const tx = await contractWithSigner.seeWins();
    console.log(tx);
}

contractInteraction();
// console.log(ethers.utils.formatBytes32String("Wayyang"));
// console.log(ethers.utils.formatBytes32String("Cute"));