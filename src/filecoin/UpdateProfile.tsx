import * as Name from "w3name";
import { IPNSResolve } from "./IPNSResolve";
import { UploadProfile } from "./UploadProfile";
import { QueryIPFS } from "./QueryIPFS";

export const UpdateProfile = async (
  name: Name.WritableName,
  plus: string,
  minus: string,
  comment: string,
  state: string
) => {
  const revision = await IPNSResolve(name.toString());
  const resolvement = revision.value;
  const query = await QueryIPFS(resolvement.toString());
  const latestProfile = await query!.text();
  const parsedLatest = JSON.parse(latestProfile);
  parsedLatest.comment.push(comment);
  parsedLatest.plus = (
    parseInt(plus, 10) + parseInt(parsedLatest.plus, 10)
  ).toString();
  parsedLatest.minus = (
    parseInt(minus, 10) + parseInt(parsedLatest.minus, 10)
  ).toString();
  parsedLatest.state = state;

  // ValleyPoint calculation logistics
  const valleyPoint = (parseInt(parsedLatest.valley_point, 10) * 2).toString();

  const cid = await UploadProfile(
    parsedLatest.address,
    parsedLatest.plus,
    parsedLatest.minus,
    valleyPoint,
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
