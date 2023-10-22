import { IPNSResolve } from "./IPNSResolve";
import { QueryIPFS } from "./QueryIPFS";
import { loadSigningKey } from "./loadSigningKey";

export const ShowProfile = async (keyJSONString: string) => {
  if (keyJSONString === "") {
    console.log("keyJSONString is empty");
    return null;
  }
  const keyJSON = JSON.parse(keyJSONString);
  const bytesUint8Array = new Uint8Array(keyJSON.length);
  for (let j = 0; j < keyJSON.length; j++) {
    const byte = keyJSON[j] as number;
    bytesUint8Array[j] = byte;
  }
  try {
    const name = await loadSigningKey(bytesUint8Array);
    console.log(name.toString());

    const resolvement = (await IPNSResolve(name.toString())).value;
    const query = await QueryIPFS(resolvement.toString());
    const queriedText = await query!.text();
    const parsedQT = JSON.parse(queriedText);
    return parsedQT;
  } catch (error) {
    return null;
  }
  //   const query = await QueryIPFS(resolvement.toString());
  //   console.log("Query IPFS Index: ", await query!.text());
  //   console.log("Query IPFS Profile: ", await queryProfile!.text());
};
