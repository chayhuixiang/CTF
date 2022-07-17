const { ethers } = require("ethers");
const ABI = require("./ABI.json");
require("dotenv").config();
const provider = ethers.providers.getDefaultProvider("ropsten");
const contractAddress = "0xf38bA85A155de6476c355B9AbD4771b59EBA57f8";
const contract = new ethers.Contract(contractAddress, ABI, provider);

const privateKey = process.env.PRIVATEKEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractWithSigner = contract.connect(wallet);

const blockchainInteraction = async () => {
    
    const tx = await provider.getTransaction("0xabc467bedd1d17462fcc7942d0af7874d6f8bdefee2b299c9168a216d3ff0edb")
    const expandedSig = {
      r: tx.r,
      s: tx.s,
      v: tx.v
    }
    const signature = ethers.utils.joinSignature(expandedSig)
    const txData = {
      gasPrice: tx.gasPrice,
      gasLimit: tx.gasLimit,
      value: tx.value,
      nonce: tx.nonce,
      data: tx.data,
      chainId: tx.chainId,
      to: tx.to // you might need to include this if it's a regular tx and not simply a contract deployment
    }
    const rsTx = await ethers.utils.resolveProperties(txData)
    const raw = ethers.utils.serializeTransaction(rsTx) // returns RLP encoded tx
    const msgHash = ethers.utils.keccak256(raw) // as specified by ECDSA
    console.log(`MsgHash: ${msgHash}`);
    const msgBytes = ethers.utils.arrayify(msgHash) // create binary hash
    const recoveredPubKey = ethers.utils.recoverPublicKey(msgBytes, signature)
    const recoveredAddress = ethers.utils.recoverAddress(msgBytes, signature)
    const compressedPubKey = "0x" + recoveredPubKey.substring(4);
    console.log(recoveredPubKey);
    console.log(compressedPubKey);
    console.log(recoveredAddress);

    const authenticate = await contractWithSigner.authenticate(compressedPubKey);
    await provider.waitForTransaction(authenticate.hash);
    
    console.log("Done!");

}

blockchainInteraction()
