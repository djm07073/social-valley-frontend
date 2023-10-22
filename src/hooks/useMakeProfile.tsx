import { useState } from "react";
import { CONFIG } from "../config/chainleader";
import { useContractWrite, useNetwork, useSwitchNetwork } from "wagmi";

export default function useMakeProfile() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const {
    write: makeProfile,
    isSuccess: isMakeProfile,
    isLoading,
  } = useContractWrite({
    address: CONFIG.base.valley_profile as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "ipns1",
            type: "string",
          },
          {
            internalType: "string",
            name: "ipns2",
            type: "string",
          },
        ],
        name: "makeProfile",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "makeProfile",
  });

  return {
    makeProfile,
    isMakeProfile,
    isLoading,
    chain,
    switchNetwork,
  };
}
