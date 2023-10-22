/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { UpdateIndex } from "../filecoin/UpdateIndex";
import { ethers } from "ethers";

import WalletAddress from "../components/WalletAddress";
import InputId from "../components/InputId";
import useConnect from "../hooks/useConnect";
import { base } from "viem/chains";

type SOCIAL_FI = "MASK" | "FRIEND" | "STAR" | "POST";

export default function AddSocialAccounts() {
  const navigate = useNavigate();
  const { base_addAccount, arbitrum_addAccount } = useConnect();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [groupId, setGroupId] = useState<string>("");
  const [nextId, setNextId] = useState<string>("");
  const [socialType, setSocialType] = useState<SOCIAL_FI>("MASK");
  const [activeButton, setActiveButton] = useState<boolean>(false);

  const addSocial = async (
    /** Type(int) mapping
     * 0 = next_id
     * 1 = post_tech
     * 2 = friend_tech
     * 3 = stars_arena
     */
    type: SOCIAL_FI,
    social_address: string,
    social_extra_param1?: string,
    social_extra_param2?: string
  ) => {
    console.log("Updating Index...");
    // await UpdateIndex(
    //   "",
    //   type,
    //   social_address,
    //   social_extra_param1,
    //   social_extra_param2
    // );
  };
  const handleConnect = async () => {
    if (socialType === "FRIEND" && chain?.id !== 8453) {
      switchNetwork?.(8453);
    } else if (socialType === "POST" && chain?.id !== 42161) {
      switchNetwork?.(42161);
    }
    if (socialType === "FRIEND" && address) {
      base_addAccount();
      // addSocial(address); TODO:
    } else if (socialType === "POST" && address) {
      arbitrum_addAccount();
      // addSocial(address); TODO:
    }
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
  const imgMargin = css`
    margin-left: 9px;
  `;
  const imgWidth = 56;
  const imgWidthSelected = 60;

  return (
    <div
      css={{
        padding: "20px 25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        onClick={() => navigate("/profile")}
        src={process.env.PUBLIC_URL + "/assets/lg_back.png"}
        width={14}
        css={{ cursor: "pointer" }}
        alt=""
      />
      <div css={{ marginTop: 36, fontSize: 14, fontWeight: 500 }}>
        Add social accounts
      </div>
      <div css={SubTitle}>Select Social dApp</div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          onClick={() => setSocialType("MASK")}
          src={process.env.PUBLIC_URL + "/assets/lg_masknetwork.png"}
          width={socialType == "MASK" ? imgWidthSelected : imgWidth}
          alt="masknetwork"
          css={{
            border: socialType == "MASK" ? "3px solid #338A46" : "none",
            padding: socialType == "MASK" ? 1 : 0,
            borderRadius: 30,
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => setSocialType("POST")}
          src={process.env.PUBLIC_URL + "/assets/lg_posttech.png"}
          width={socialType == "POST" ? imgWidthSelected : imgWidth}
          alt="posttech"
          css={{
            border: socialType == "POST" ? "3px solid #338A46" : "none",
            padding: socialType == "POST" ? 1 : 0,
            borderRadius: 30,
            marginLeft: 9,
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => setSocialType("FRIEND")}
          src={process.env.PUBLIC_URL + "/assets/lg_friendtech.png"}
          width={socialType == "FRIEND" ? imgWidthSelected : imgWidth}
          alt="friendtech"
          css={{
            border: socialType == "FRIEND" ? "3px solid #338A46" : "none",
            padding: socialType == "FRIEND" ? 1 : 0,
            borderRadius: 30,
            marginLeft: 9,
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => setSocialType("STAR")}
          src={process.env.PUBLIC_URL + "/assets/lg_starsarena.png"}
          width={socialType == "STAR" ? imgWidthSelected : imgWidth}
          alt="starsarena"
          css={{
            border: socialType == "STAR" ? "3px solid #338A46" : "none",
            padding: socialType == "STAR" ? 1 : 0,
            borderRadius: 30,
            marginLeft: 9,
            cursor: "pointer",
          }}
        />
      </div>
      <WalletAddress
        hidden={socialType == "MASK" ? true : false}
        socialType={socialType}
        address={address}
        SubTitle={SubTitle}
        StyledInput={StyledInput}
        StyledButton={StyledButton}
        setActiveButton={setActiveButton}
      />
      {socialType != "FRIEND" ? (
        <InputId
          socialType={socialType}
          address={address}
          groupId={groupId}
          nextId={nextId}
          setGroupId={setGroupId}
          setNextId={setNextId}
          SubTitle={SubTitle}
          StyledInput={StyledInput}
          setActiveButton={setActiveButton}
        />
      ) : (
        <div />
      )}
      {activeButton ? (
        <div onClick={handleConnect} css={StyledButton}>
          Connect
        </div>
      ) : (
        <div style={{ backgroundColor: "#DDDDDD" }} css={StyledButton}>
          Connect
        </div>
      )}
    </div>
  );
}
