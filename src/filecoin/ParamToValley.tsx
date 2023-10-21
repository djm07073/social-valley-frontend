import * as Name from "w3name";
import { IPNSResolve } from "./IPNSResolve";
import { QueryIPFS } from "./QueryIPFS";

/**
 * HEAD IPNS public key = k51qzi5uqu5di78bplrj60ih23z5re2nswu495z6tbmng1t9e0kkq1dw6t4q9r
 */

export const ParamToValley = async (type: number, param: string) => {
  const headIPNSPublicKey =
    "k51qzi5uqu5di78bplrj60ih23z5re2nswu495z6tbmng1t9e0kkq1dw6t4q9r";

  console.log("---------------------------------------");
  const resolvement = (await IPNSResolve(headIPNSPublicKey)).value;
  const query = await QueryIPFS(resolvement.toString());
  console.log("Query IPFS Index: ", await query!.text());
};
