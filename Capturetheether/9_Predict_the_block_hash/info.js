const { ethers } = require("ethers");
require("dotenv").config()

let provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0xDc3053eBF5b95a63DB09CC85dBB091767Bdfb8E3"
const contractInteraction = async () => {
    const result = await provider.getStorageAt(contractAddress, 0);
    console.log(result);
}
contractInteraction();

// exploit contract 0x19Bf0c59c5D755c0aeae10a1b6e717e7F3C12DD5
