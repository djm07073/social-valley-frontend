import { IPNSResolve } from "./IPNSResolve";
import { QueryIPFS } from "./QueryIPFS";
import { loadSigningKey } from "./loadSigningKey";

export const ShowProfile = async (keyJSONString: string) => {
  if (keyJSONString === "") {
    console.log("keyJSONString is empty");
    return null;
  } else {
    console.log("keyJSONString is not empty");
    console.log(keyJSONString);
  }
  const keyJSON = JSON.parse(keyJSONString);
  console.log("keyJSON", keyJSON);
  const buffer = new ArrayBuffer(Object.keys(keyJSON).length);
  const uint8Array = new Uint8Array(buffer);
  Object.keys(keyJSON).forEach((key) => {
    uint8Array[parseInt(key, 10)] = keyJSON[key];
  });

  console.log(uint8Array);
  const name = await loadSigningKey(uint8Array);
  console.log(name.toString());

  const resolvement = (await IPNSResolve(name.toString())).value;
  const query = await QueryIPFS(resolvement.toString());
  const queriedText = await query!.text();
  const parsedQT = JSON.parse(queriedText);
  return [parsedQT, name];
};
