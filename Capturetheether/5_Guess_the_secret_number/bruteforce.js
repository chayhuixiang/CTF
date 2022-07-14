const { ethers } = require("ethers");

const answerHash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365"
let bruteforceHash = ""
let count = 0
while (bruteforceHash != answerHash) {
    bruteforceHash = ethers.utils.keccak256(count);
    console.log(bruteforceHash, count);
    count++;
}
