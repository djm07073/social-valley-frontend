/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { ParamToValley } from "../filecoin/ParamToValley";
import { useContractRead } from "wagmi";
import { CONFIG } from "../config/chainleader";

interface CommentProps {
  groupId: string;
  checkChain: string;
}

export default function Comment({ groupId, checkChain }: CommentProps) {
  const params = new URLSearchParams(window.location.search);
  const [vely, setVely] = useState(0);
  const [chooseGood, setChooseGood] = useState(false);
  const [chooseBad, setChooseBad] = useState(false);
  const [comment, setComment] = useState("");
  const [valley_address, setValley_address] = useState<`0x${string}`>("0x");
  const id = params.get("groupId");
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

  const handleSave = async () => {
    console.log("Updating Profile");
    let checkChainNum: number = 0;
    if (checkChain === "MASK") {
      checkChainNum = 0;
    } else if (checkChain === "POST") {
      checkChainNum = 1;
    }
    const _valley_address = await ParamToValley(checkChainNum, groupId);
    setValley_address(_valley_address);

    console.log("valley_address found!", _valley_address);
    console.log("Updating Profile...");

    console.log(valley_reputation_data);
  };

  const SubTitle = css`
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 400;
  `;
  const StyledInput = css`
    width: 100%;
    padding: 10px 12px;
    height: 39px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 7px;
    border: 2px solid #dddddd;
  `;
  const StyledButton = css`
    margin-top: 25px;
    padding: 10px 0px;
    background-color: #338a46;
    width: 100%;
    height: 38px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 7px;
    text-align: center;
    color: white;
    cursor: pointer;
  `;

  function chooseOpinion(value: String) {
    if (value === "good") {
      setChooseGood(true);
      setChooseBad(false);
    } else {
      setChooseGood(false);
      setChooseBad(true);
    }
  }

  return (
    <div
      css={{
        padding: "37px 25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/img_valley_2.png"}
          width={78}
          alt="valley_2"
          css={{ marginTop: 13, marginBottom: 15 }}
        />
        <div css={{ fontSize: 12, fontWeight: 400, marginBottom: 3 }}>
          {groupId}
        </div>
        <div
          css={{
            fontSize: 18,
            fontWeight: 500,
            marginBottom: 10,
            color: "#338A46",
          }}
        >
          {vely} vely
        </div>
      </div>
      <div css={SubTitle}>What is your opinion on this Group id?</div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          onClick={() => chooseOpinion("good")}
          src={
            chooseGood
              ? process.env.PUBLIC_URL + "/assets/ic_good_on.png"
              : process.env.PUBLIC_URL + "/assets/ic_good_off.png"
          }
          width={62}
          alt="ic_good"
          css={{ cursor: "pointer" }}
        />
        <img
          onClick={() => chooseOpinion("bad")}
          src={
            chooseBad
              ? process.env.PUBLIC_URL + "/assets/ic_bad_on.png"
              : process.env.PUBLIC_URL + "/assets/ic_bad_off.png"
          }
          width={62}
          alt="ic_bad"
          css={{ marginLeft: 24, cursor: "pointer" }}
        />
      </div>
      <div css={SubTitle}>Comment</div>
      <input
        css={StyledInput}
        type="text"
        placeholder="Leave your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <div css={StyledButton}>Save</div>
    </div>
  );
}
