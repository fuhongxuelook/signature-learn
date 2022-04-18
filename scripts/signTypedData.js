// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you"ll find the Hardhat
// Runtime Environment"s members available in the global scope.
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
  // await hre.run("compile");


  const domain = {
      name: "Demo",
      version: "version1",
      chainId: 97,
      verifyingContract: "0x9760C2cB7AD7DEb9302e144067F3Ba4Ae5F72878"
  };

  // The named list of all type definitions
  const types = {
      MyFunction: [
        {name: "owner", type: "address" },
        {name: "myParam", type: "uint256" },
        {name: "deadline", type: "uint256" }
      ]
  };

  // The data to sign
  const value = {
      owner: "0xAF702571cb3F0b9091C6E6c8B9731705E2ee0804",
      myParam: 1,
      deadline: 2
  };

  sig = await signer._signTypedData(domain, types, value);
  console.log("sig is :", sig)

  let splitedSig = ethers.utils.splitSignature( sig )
  console.log("splited sig:", splitedSig)




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
