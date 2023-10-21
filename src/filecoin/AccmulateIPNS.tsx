import * as Name from "w3name";
import { Web3Storage } from "web3.storage";
import { MakeStorageClient } from "./MakeStorageClient";
import { saveSigningKey } from "./saveSigningKey";
import { loadSigningKey } from "./loadSigningKey";
import { IPNSResolve } from "./IPNSResolve";
import { QueryIPFS } from "./QueryIPFS";

export const AccumulateIPNS = async (IPNS: Uint8Array) => {
  const bytes = [
    8, 1, 18, 64, 201, 32, 19, 207, 180, 82, 132, 133, 152, 76, 197, 56, 20, 21,
    210, 81, 81, 172, 12, 137, 163, 254, 79, 201, 237, 236, 120, 51, 49, 128,
    12, 42, 80, 245, 168, 211, 172, 5, 1, 188, 13, 82, 239, 130, 67, 154, 173,
    0, 225, 53, 23, 188, 195, 66, 101, 137, 108, 182, 203, 145, 24, 222, 178,
    255,
  ];
  //   Retrieval of previous ipns accumulation
  const uint8bytes = new Uint8Array(bytes);
  const name = await loadSigningKey(uint8bytes);
  const revision = await IPNSResolve(name.toString());
  const resolvement = revision.value;
  const query = await QueryIPFS(resolvement.toString());

  //   Add new IPNS to previous accumulation
  const prevAccumulation = await query!.text();
  const parsedPrev = JSON.parse(prevAccumulation);
  parsedPrev.ipnsAccumulated.push(IPNS);

  const filePath = "data.json";
  const jsonString = JSON.stringify(parsedPrev);

  const storage = await MakeStorageClient();

  console.log("Uploading IPNS Accumulation...");
  const cid = await storage.put([new File([jsonString], filePath)], {
    wrapWithDirectory: false,
  });
  console.log("Content added with CID: ", cid);
  console.log("---------------------------------------");

  const nextValue = cid;

  console.log("Publishing new accumulation file...");
  console.log("revision, nextValue", revision, nextValue);
  const nextRevision = await Name.increment(revision, nextValue);
  await Name.publish(nextRevision, name.key);
  console.log("Success");

  console.log("---------------------------------------");

  return cid;
};
