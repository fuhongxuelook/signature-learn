// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

let provider = hre.ethers.provider;
let signer = provider.getSigner();

async function main() {

  let my_address = await signer.getAddress()
  console.log("address =", my_address)
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let data = "hello world";


  let dataId = ethers.utils.id(data);
  console.log("data id is:", dataId)

  let dataKeccak256 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data));
  console.log("data Keccak256 is:", dataKeccak256)

  // 解析结果是0x 二进制
  // 需要转换成Uint8Array[]
  let dataHashBytes = ethers.utils.arrayify(dataId)

  let dataHashArrayify = ethers.utils.hashMessage(dataHashBytes);
  console.log(dataHashArrayify)

  let sig = await signer.signMessage(dataHashBytes);
  console.log("sig is:", sig);


  let sigNotArrayfy = await signer.signMessage(dataId);
  console.log("sigNotArrayfy is:", sigNotArrayfy);

  let splitedSig = ethers.utils.splitSignature( sig )
  console.log("splited sig:", splitedSig)


  let recovered = ethers.utils.recoverAddress( dataHashArrayify , splitedSig ) 
  console.log("recovered:", recovered)


  let verify_address = ethers.utils.verifyMessage(dataHashBytes , sig) 
  console.log("verify_address:", verify_address);



  let arr = 12300
  let af = ethers.utils.arrayify(arr)
  console.log(af);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
