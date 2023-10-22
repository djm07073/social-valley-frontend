import { Web3Storage } from "web3.storage";
import { MakeStorageClient } from "./MakeStorageClient";

export const CheckCIDStatus = async (cid: string) => {
  const client = await MakeStorageClient();
  const status = await client.status(cid);
  return status;
  if (status) {
  }
};
