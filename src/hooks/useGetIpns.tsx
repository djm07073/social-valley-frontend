import { useAccount, useContractRead } from "wagmi";
import { CONFIG } from "../config/chainleader";
import { useEffect, useState } from "react";

export default function useGetIpns(origin: `0x${string}`) {
  const reputation = {
    address: CONFIG.base.valley_profile as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "getReputation",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getReputation",
    args: [origin],
  };
  const accountInfo = {
    address: CONFIG.base.valley_profile as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "getSocialAccountInfo",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getSocialAccountInfo",
    args: [origin],
  };
  const { data: reputationIpns } = useContractRead(reputation);
  const { data: accountInfoIpns } = useContractRead(accountInfo);

  return {
    reputationIpns,
    accountInfoIpns,
  };
}
