const Web3 = require("web3");
const web3 = new Web3("http://awesome.chall.seetf.sg:40002");
var Eth = require('web3-eth');
var eth = new Eth("http://awesome.chall.seetf.sg:40002");
const contractAddress = "0x9f448aA0087fA2ED0155302C8d9daa0FDf6D1BB5"
const senderAddress = "REDACTED";

const contractInteraction = async() => {
    const hash = web3.utils.soliditySha3({ type: "address", value: senderAddress }, { type: "uint", value: 5 });
    const result = await web3.eth.getStorageAt(contractAddress, hash);
    console.log(web3.utils.hexToNumber(result));
}

contractInteraction()