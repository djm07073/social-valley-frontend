import React from "react";
import { useAccount, useContractWrite } from "wagmi";
import { CONFIG } from "../config/chainleader";

export default function useConnect() {
  const { address } = useAccount();
  const { write: base_addAccount } = useContractWrite({
    address: CONFIG.base.chainLeader as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "ipnsUrl",
            type: "string",
          },
        ],
        name: "addAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "addAccount",
    args: [address!],
  });
  const { write: arbitrum_addAccount } = useContractWrite({
    address: CONFIG.arbitrum.chainLeader as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "ipnsUrl",
            type: "string",
          },
        ],
        name: "addAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "addAccount",
    args: [address!],
  });
  return { base_addAccount, arbitrum_addAccount };
}
