import { ethers } from "ethers";

export async function getDealProposal(taskArgs: {
  contract: string;
  proposalid: number;
}) {
  const contractAddr: string = taskArgs.contract;
  const proposalID: number = taskArgs.proposalid;
  //   @ts-ignore
  const networkId: string = network.name;
  console.log("Getting deal proposal on network", networkId);

  //   @ts-ignore
  const wallet = new ethers.Wallet(wallet, provider);

  const DealClient = await new ethers.ContractFactory("DealClient", wallet);
  const dealClient = await DealClient.attach(contractAddr);

  console.log("checkpoint");
  //   @ts-ignore
  const result = await dealClient.getDealProposal(proposalID);
  // Change getDealProposal to try/wait
  console.log("The deal proposal is:", result);
}

// Example usage:
const exampleTaskArgs = {
  contract: "0xYourContractAddress",
  proposalid: 123,
};

getDealProposal(exampleTaskArgs);
