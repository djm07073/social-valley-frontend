/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import axios from "axios";
import { ParamToValley } from "../filecoin/ParamToValley";
import { CONFIG } from "../config/chainleader";
import { useContractRead } from "wagmi";
import { useNavigate } from "react-router-dom";

interface NotFollowingProps {
  groupId: string;
  checkChain: string;
}


export default function NotFollowing({
  groupId,
  checkChain,
}: NotFollowingProps) {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("groupId");
  const [valley_address, setValley_address] = useState<`0x${string}`>("0x");
  const { data: valley_reputation_data } = useContractRead({
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
    address: CONFIG.base.valley_profile as `0x${string}`,
    functionName: "getReputation",
    args: [valley_address],
  });

  const [vely, setVely] = useState(0);

  const handleMaskClick = async () => {
    navigate('/web3bio');
  };

  const handleStorageClick = async () => {
    console.log("Updating Profile");
    let checkChainNum: number = 0;
    if (checkChain === "MASK") {
      checkChainNum = 0;
    } else if (checkChain === "POST") {
      checkChainNum = 1;
    }
    const valley_address = await ParamToValley(checkChainNum, groupId);
    console.log("valley_address found!", valley_address);
    console.log("Updating Profile...");

    setValley_address(valley_address);
    
    // navigate('/web3storage');
  };

  const StyledButtonHexagon = css`
    margin-top: 10px;
    width: 236px;
    height: 42px;
    text-align: center;
    padding: 10px 0px;
    background-color: #338a46;
    font-size: 14px;
    color: white;
    cursor: pointer;
    font-weight: 300;
  `;

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/assets/img_valley_2.png"}
        width={78}
        alt="valley_2"
        css={{ marginBottom: 15 }}
      />
      <div css={{ fontSize: 12, fontWeight: 400, marginBottom: 3 }}>
        {groupId}
      </div>
      <div
        css={{
          fontSize: 18,
          fontWeight: 500,
          marginBottom: 43,
          color: "#338A46",
        }}
      >
        {vely} vely
      </div>
      <div css={{ fontSize: 12, fontWeight: 300, marginBottom: 2 }}>
        Check this user
      </div>
      <div onClick={handleStorageClick}css={StyledButtonHexagon}>Web3 storage</div>
      <div onClick={handleMaskClick} css={StyledButtonHexagon}>Mask network</div>
    </div>
  );
}
