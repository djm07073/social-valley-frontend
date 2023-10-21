import { Name } from "w3name";
import { Web3Storage } from "web3.storage";
import { MakeStorageClient } from "./MakeStorageClient";

export const UploadProfile = async (
  address: string,
  plus: string,
  minus: string,
  valley_point: string,
  comment: string[],
  state: string
) => {
  const json = {
    address,
    plus,
    minus,
    valley_point,
    comment,
    state,
  };
  const filePath = "data.json";
  const jsonString = JSON.stringify(json);

  const storage = await MakeStorageClient();

  console.log("Uploading Profile...");
  const cid = await storage.put([new File([jsonString], filePath)], {
    wrapWithDirectory: false,
  });
  console.log("Content added with CID: ", cid);
  console.log("---------------------------------------");
  return cid;
};
