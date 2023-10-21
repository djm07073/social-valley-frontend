import { Web3Storage } from "web3.storage";
import { MakeStorageClient } from "./MakeStorageClient";

export const QueryIPFS = async (cid: string) => {
  const client = await MakeStorageClient();
  const res = await client.get(cid);
  if (res) {
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(
        `failed to get ${cid} - [${res.status}] ${res.statusText}`
      );
    } else {
      const files = await res.files();
      for (const file of files) {
        return file;
        // console.log(await file.text());
      }
    }
  }
};
