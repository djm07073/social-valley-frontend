import * as Name from "w3name";
import { IPNSResolve } from "./IPNSResolve";
import { UploadIndex } from "./UploadIndex";

export const UpdateIndex = async (
  name: Name.WritableName,
  address: string,
  next_id: string,
  post_tech: string,
  post_tech_group_id: string,
  friend_tech: string,
  stars_arena: string,
  stars_arena_twitter_handle: string,
  stars_arena_group_id: string
) => {
  const revision = await IPNSResolve(name.toString());
  const cid = await UploadIndex(
    address,
    next_id,
    post_tech,
    post_tech_group_id,
    friend_tech,
    stars_arena,
    stars_arena_twitter_handle,
    stars_arena_group_id
  );
  const nextValue = cid;

  console.log("---------------------------------------");
  console.log("Publishing new index ipfs file...");
  console.log("revision, nextValue", revision, nextValue);
  const nextRevision = await Name.increment(revision, nextValue);
  await Name.publish(nextRevision, name.key);
  console.log("Success");
};
