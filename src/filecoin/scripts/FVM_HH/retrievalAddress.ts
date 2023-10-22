import { ethers } from "ethers";

const fa = require("@glif/filecoin-address");

export const retrievalAddress = (taskArgs: any) => {
  //create new Wallet object from private key
  const DEPLOYER_PRIVATE_KEY = "0x...";
  const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);

  //Convert Ethereum address to f4 address
  const f4Address = fa.newDelegatedEthAddress(deployer.address).toString();
  console.log(
    "Ethereum address (this addresss should work for most tools):",
    deployer.address
  );
  console.log("f4address (also known as t4 address on testnets):", f4Address);
};
