import {
  Contract,
  ContractFactory,
  ContractRunner,
  JsonRpcProvider,
  Wallet,
} from "ethers";
const CID = require("cids");

export async function makeDealProposal(taskArgs: {
  contract: string;
  pieceCid: string;
  pieceSize: string;
  verifiedDeal: string;
  label: string;
  startEpoch: string;
  endEpoch: string;
  storagePricePerEpoch: string;
  providerCollateral: string;
  clientCollateral: string;
  extraParamsVersion: string;
  locationRef: string;
  carSize: string;
  skipIpniAnnounce: string;
  removeUnsealedCopy: string;
}) {
  // Store taskArgs as usable variables
  // Convert piece CID string to hex bytes
  const cid = taskArgs.pieceCid;
  const cidHexRaw = new CID(cid).toString("base16").substring(1);
  const cidHex = "0x" + cidHexRaw;
  const contractAddr = taskArgs.contract;

  const verified = taskArgs.verifiedDeal === "true";
  const skipIpniAnnounce = taskArgs.skipIpniAnnounce === "true";
  const removeUnsealedCopy = taskArgs.removeUnsealedCopy === "true";

  const extraParamsV1 = [
    taskArgs.locationRef,
    taskArgs.carSize,
    skipIpniAnnounce,
    removeUnsealedCopy,
  ];

  const DealRequestStruct = [
    cidHex,
    taskArgs.pieceSize,
    verified,
    taskArgs.label,
    taskArgs.startEpoch,
    taskArgs.endEpoch,
    taskArgs.storagePricePerEpoch,
    taskArgs.providerCollateral,
    taskArgs.clientCollateral,
    taskArgs.extraParamsVersion,
    extraParamsV1,
  ];

  const provider = new JsonRpcProvider("");
  const wallet: ContractRunner = new Wallet("", provider);
  // @ts-ignore
  const DealClient: any = await new ContractFactory("DealClient", wallet);

  const dealClient = new Contract(
    contractAddr,
    DealClient?.abi,
    wallet as ContractRunner
  );

  const transaction = await dealClient.makeDealProposal(DealRequestStruct);
  const transactionReceipt = await transaction.wait();

  const event = transactionReceipt.events[0].topics[0];
  console.log("Complete! Event Emit", event);
}
