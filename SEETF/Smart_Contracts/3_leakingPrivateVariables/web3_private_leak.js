const Web3 = require("web3");
const web3 = new Web3("http://awesome.chall.seetf.sg:40002");
var Eth = require('web3-eth');
var eth = new Eth("http://awesome.chall.seetf.sg:40002");
const contractAddress = "0xbee67411cA75a5a8325D25a302B7D07CD5264c3b"

const contractInteraction = async() => {
    const hash = web3.utils.soliditySha3({ type: "uint", value: 1 }, { type: "uint", value: 1 }); // mapping at key 1, slot 1
    const result = await web3.eth.getStorageAt(contractAddress, 2); // getting slot 2 variable
    console.log(web3.utils.hexToNumber(result));
}
contractInteraction()