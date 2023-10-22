import * as Name from "w3name";
import process from "process";
import { Web3Storage } from "web3.storage";
import { MakeStorageClient } from "./MakeStorageClient";
import { CheckCIDStatus } from "./CheckCIDStatus";
import { IPNSResolve } from "./IPNSResolve";
import { QueryIPFS } from "./QueryIPFS";
import { UploadIndex } from "./UploadIndex";
import { UpdateIndex } from "./UpdateIndex";
import { UploadProfile } from "./UploadProfile";
import { UpdateProfile } from "./UpdateProfile";
import { AccumulateIPNS } from "./AccmulateIPNS";
import { saveSigningKey } from "./saveSigningKey";

export const IPNSCreateAndUpload = async (address: string) => {
  // Created 2 IPNS
  const name = await Name.create();
  const profileName = await Name.create();
  console.log(name.toString());
  console.log(profileName.toString());

  // Accumulate IPNS
  const nameBytes = saveSigningKey(name);
  const profileNameBytes = saveSigningKey(profileName);
  await AccumulateIPNS(nameBytes);
  await AccumulateIPNS(profileNameBytes);

  const storage = await MakeStorageClient();

  // Upload to IPFS, retrieval of CIDS
  const cid = await UploadIndex(address, "", "", "", "", "", "", "");
  const cidProfile = await UploadProfile(address, "", "", "", ["none"], "");

  const value = cid;
  const revision = await Name.v0(name, value);
  await Name.publish(revision, name.key);
  console.log("IPNS published: ", revision);

  const valueProfile = cidProfile;
  const revisionProfile = await Name.v0(profileName, valueProfile);
  await Name.publish(revisionProfile, profileName.key);
  console.log("IPNS published: ", revisionProfile);

  console.log("---------------------------------------");
  console.log("Checking CID status...");
  const cidStatus = await CheckCIDStatus(cid);
  const cidStatusProfile = await CheckCIDStatus(cidProfile);
  console.log("CID status of index: ", cidStatus);
  console.log("CID status of profile: ", cidStatusProfile);

  console.log("---------------------------------------");
  console.log("Convert signing bytes to string");
  const nameBytesString = JSON.stringify(nameBytes);
  const profileNameBytesString = JSON.stringify(profileNameBytes);
  console.log(nameBytesString);
  console.log(profileNameBytesString);

  return {
    nameBytesString,
    profileNameBytesString,
  };

  // console.log("---------------------------------------");
  // console.log("Resolving IPNS name...");
  // const resolvement = (await IPNSResolve(name.toString())).value;
  // const resolvementProfile = (await IPNSResolve(profileName.toString())).value;
  // console.log("Resolved IPNS Index: ", resolvement);
  // console.log("Resolved IPNS Profile: ", resolvementProfile);

  // console.log("---------------------------------------");
  // console.log("Query IPFS file data...");
  // const query = await QueryIPFS(resolvement.toString());
  // const queryProfile = await QueryIPFS(resolvementProfile.toString());
  // console.log("Query IPFS Index: ", await query!.text());
  // console.log("Query IPFS Profile: ", await queryProfile!.text());

  // console.log("---------------------------------------");
  // console.log("Updating IPNS...");
  // await UpdateIndex(
  //   name,
  //   address,
  //   "0x1",
  //   "0x2",
  //   "0x3",
  //   "0x4",
  //   "0x5",
  //   "0x6",
  //   "0x7"
  // );
  //   await UpdateProfile(profileName, address, "1", "0", "30", "good person", "");
  //   const newResolvementIndex = (await IPNSResolve(name.toString())).value;
  //   const newResolvementProfile = (await IPNSResolve(profileName.toString()))
  //     .value;
  //   const newIndexQuery = await QueryIPFS(newResolvementIndex.toString());
  //   const newProfileQuery = await QueryIPFS(newResolvementProfile.toString());
  //   console.log("Query New IPFS Index: ", await newIndexQuery!.text());
  //   console.log("Query New IPFS Profile: ", await newProfileQuery!.text());
};
