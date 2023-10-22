import * as Name from "w3name";
import { IPNSResolve } from "./IPNSResolve";
import { QueryIPFS } from "./QueryIPFS";
import { loadSigningKey } from "./loadSigningKey";

/**
 * HEAD IPNS public key = k51qzi5uqu5di78bplrj60ih23z5re2nswu495z6tbmng1t9e0kkq1dw6t4q9r
 */

export const ParamToValley = async (type: number, socialId: string) => {
  const headIPNSPublicKey =
    "k51qzi5uqu5di78bplrj60ih23z5re2nswu495z6tbmng1t9e0kkq1dw6t4q9r";
  console.log("---------------------------------------");
  const resolvement = (await IPNSResolve(headIPNSPublicKey)).value;
  const query = await QueryIPFS(resolvement.toString());
  const prev = await query!.text();
  const parsedPrev = JSON.parse(prev);

  for (let i = 0; i < parsedPrev.ipnsAccumulated.length; i++) {
    const bytes = parsedPrev.ipnsAccumulated[i];
    const bytesList = Object.values(bytes);
    const bytesUint8Array = new Uint8Array(bytesList.length);
    for (let j = 0; j < bytesList.length; j++) {
      const byte = bytesList[j] as number;
      bytesUint8Array[j] = byte;
    }
    try {
      const name = await loadSigningKey(bytesUint8Array);
      console.log(name.toString());

      const resolvement = (await IPNSResolve(name.toString())).value;
      const query = await QueryIPFS(resolvement.toString());
      const prev = await query!.text();
      const parsedPrev = JSON.parse(prev);

      if (type == 0) {
        if (parsedPrev.next_id == socialId) {
          console.log("Found!");
          return parsedPrev.valley_address;
        }
      } else if (type == 1) {
        if (parsedPrev.post_tech_group_id == socialId) {
          console.log("Found!");
          return parsedPrev.valley_address;
        }
      }
    } catch (error) {
      continue; // Continue to the next iteration
    }
  }
};
