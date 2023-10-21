import { Name } from "w3name";
import { Web3Storage } from "web3.storage";
import { MakeStorageClient } from "./MakeStorageClient";

export const UploadIndex = async (
  address: string,
  next_id: string,
  post_tech: string,
  post_tech_group_id: string,
  friend_tech: string,
  stars_arena: string,
  stars_arena_twitter_handle: string,
  stars_arena_group_id: string
) => {
  const json = {
    valley_address: address,
    next_id: next_id,
    post_tech: {
      address: post_tech,
      group_id: post_tech_group_id,
    },
    friend_tech: friend_tech,
    stars_arena: {
      address: stars_arena,
      twitter_handle: stars_arena_twitter_handle,
      group_id: stars_arena_group_id,
    },
  };
  const filePath = "data.json";
  const jsonString = JSON.stringify(json);

  const storage = await MakeStorageClient();

  console.log("---------------------------------------");
  console.log("Uploading Index...");
  const cid = await storage.put([new File([jsonString], filePath)], {
    wrapWithDirectory: false,
  });
  console.log("Content added with CID: ", cid);
  return cid;
};
