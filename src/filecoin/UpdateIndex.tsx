import * as Name from "w3name";
import { IPNSResolve } from "./IPNSResolve";
import { UploadIndex } from "./UploadIndex";
import { QueryIPFS } from "./QueryIPFS";
import { parsed } from "yargs";
import { CIDString } from "web3.storage";

export const UpdateIndex = async (
  name: Name.WritableName,
  type: number,
  social_address: string,
  social_extra_param1: string,
  social_extra_param2: string
) => {
  const revision = await IPNSResolve(name.toString());
  const resolvement = revision.value;
  const query = await QueryIPFS(resolvement.toString());
  const latestIndex = await query!.text();
  const parsedLatest = JSON.parse(latestIndex);

  /** Type(int) mapping
   * 0 = next_id
   * 1 = post_tech
   * 2 = friend_tech
   * 3 = stars_arena
   */

  let cid: CIDString = "";

  if (type == 0) {
    cid = await UploadIndex(
      parsedLatest.valley_address,
      social_address,
      parsedLatest.post_tech.address,
      parsedLatest.post_tech.group_id,
      parsedLatest.friend_tech,
      parsedLatest.stars_arena.address,
      parsedLatest.stars_arena.twitter_handle,
      parsedLatest.stars_arena.group_id
    );
  } else if (type == 1) {
    cid = await UploadIndex(
      parsedLatest.valley_address,
      parsedLatest.next_id,
      social_address,
      social_extra_param1,
      parsedLatest.friend_tech,
      parsedLatest.stars_arena.address,
      parsedLatest.stars_arena.twitter_handle,
      parsedLatest.stars_arena.group_id
    );
  } else if (type == 2) {
    cid = await UploadIndex(
      parsedLatest.valley_address,
      parsedLatest.next_id,
      parsedLatest.post_tech.address,
      parsedLatest.post_tech.group_id,
      social_address,
      parsedLatest.stars_arena.address,
      parsedLatest.stars_arena.twitter_handle,
      parsedLatest.stars_arena.group_id
    );
  } else if (type == 3) {
    cid = await UploadIndex(
      parsedLatest.valley_address,
      parsedLatest.next_id,
      parsedLatest.post_tech.address,
      parsedLatest.post_tech.group_id,
      parsedLatest.friend_tech,
      social_address,
      social_extra_param1,
      social_extra_param2
    );
  }

  const nextValue = cid;

  console.log("---------------------------------------");
  console.log("Publishing new index ipfs file...");
  console.log("revision, nextValue", revision, nextValue);
  const nextRevision = await Name.increment(revision, nextValue);
  await Name.publish(nextRevision, name.key);
  console.log("Success");
};
