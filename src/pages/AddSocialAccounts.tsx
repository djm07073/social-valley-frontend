/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import WalletAddress from "../components/WalletAddress";
import InputId from "../components/InputId";
import useConnect from "../hooks/useConnect";
import { ShowProfile } from "../filecoin/ShowProfile";
import { ValleyProfile } from "../components/ValleyProfile";
import { ValleyIndex } from "../components/ValleyIndex";
import * as Name from "w3name";
import { UpdateIndex } from "../filecoin/UpdateIndex";

type SOCIAL_FI = "MASK" | "FRIEND" | "STAR" | "POST";

export default function AddSocialAccounts() {
  const navigate = useNavigate();
  const { base_addAccount, arbitrum_addAccount } = useConnect();
  const { address } = useAccount();
  const [isOrigin, setIsOrigin] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>("");
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [groupId, setGroupId] = useState<string>("");
  const [nextId, setNextId] = useState<string>("");
  const [socialType, setSocialType] = useState<SOCIAL_FI>("MASK");
  const [activeButton, setActiveButton] = useState<boolean>(false);

  let parsedQT: any;
  let name: Name.WritableName;

  const addSocial = async (typeEnum: number) =>
    /** Type(int) mapping
     * 0 = next_id
     * 1 = post_tech
     * 2 = friend_tech
     * 3 = stars_arena
     */
    {
      console.log("Updating Index...");
      await UpdateIndex(
        name,
        typeEnum,
        typeEnum == 1 ? nextId : groupId,
        "",
        ""
      );
    };

  const retreive_valley_info_data = async () => {
    const valley_info_data = await ValleyProfile(address as string);
    const res = await ShowProfile(valley_info_data as string);
    parsedQT = res![0];
    name = res![1];
  };

  useEffect(() => {
    retreive_valley_info_data();
  }, []);

  useEffect(() => {
    if (address && !isOrigin) {
      setOrigin(address);
      setIsOrigin(true);
    }
  }, [address]);
  const handleConnect = async () => {
    if (socialType === "FRIEND" && chain?.id !== 8453) {
      switchNetwork?.(8453);
    } else if (socialType === "POST" && chain?.id !== 42161) {
      switchNetwork?.(42161);
    }
    if (socialType === "FRIEND" && address) {
      base_addAccount();
      addSocial(2);
    } else if (socialType === "POST" && address) {
      arbitrum_addAccount();
      addSocial(1);
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
        <div
          onClick={handleConnect}
          style={{ backgroundColor: "#DDDDDD" }}
          css={StyledButton}
        >
          Connect
        </div>
      )}
    </div>
  );
}
