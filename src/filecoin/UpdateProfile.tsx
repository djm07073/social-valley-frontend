import * as Name from "w3name";
import { IPNSResolve } from "./IPNSResolve";
import { UploadProfile } from "./UploadProfile";
import { QueryIPFS } from "./QueryIPFS";

export const UpdateProfile = async (
  name: Name.WritableName,
  address: string,
  plus: string,
  minus: string,
  valley_point: string,
  comment: string,
  state: string
) => {
  const revision = await IPNSResolve(name.toString());
  const resolvement = revision.value;
  const query = await QueryIPFS(resolvement.toString());
  const latestProfile = await query!.text();
  const parsedLatest = JSON.parse(latestProfile);
  parsedLatest.comment.push(comment);

  const cid = await UploadProfile(
    address,
    plus,
    minus,
    valley_point,
    parsedLatest.comment,
    state
  );
  const nextValue = cid;

  console.log("Publishing new profile ipfs file...");
  console.log("revision, nextValue", revision, nextValue);
  const nextRevision = await Name.increment(revision, nextValue);
  await Name.publish(nextRevision, name.key);
  console.log("Success");
  console.log("---------------------------------------");
};
