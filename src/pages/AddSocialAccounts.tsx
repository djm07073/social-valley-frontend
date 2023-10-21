/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateIndex } from "../filecoin/UpdateIndex";
import { useAccount } from "wagmi";
export default function AddSocialAccounts() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [groupId, setGroupId] = useState("");
  const [socialType, setSocialType] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleAddSocial = async (
    /** Type(int) mapping
     * 0 = next_id
     * 1 = post_tech
     * 2 = friend_tech
     * 3 = stars_arena
     */
    type: number,
    social_address: string,
    social_extra_param1: string,
    social_extra_param2: string
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
          onClick={() => setSocialType(1)}
          src={process.env.PUBLIC_URL + "/assets/lg_posttech.png"}
          width={socialType == 1 ? imgWidthSelected : imgWidth}
          alt="posttech"
          css={{
            border: socialType == 1 ? "3px solid #338A46" : "none",
            padding: socialType == 1 ? 1 : 0,
            borderRadius: 30,
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => setSocialType(2)}
          src={process.env.PUBLIC_URL + "/assets/lg_friendtech.png"}
          width={socialType == 2 ? imgWidthSelected : imgWidth}
          alt="friendtech"
          css={{
            border: socialType == 2 ? "3px solid #338A46" : "none",
            padding: socialType == 2 ? 1 : 0,
            borderRadius: 30,
            marginLeft: 9,
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => setSocialType(3)}
          src={process.env.PUBLIC_URL + "/assets/lg_starsarena.png"}
          width={socialType == 3 ? imgWidthSelected : imgWidth}
          alt="starsarena"
          css={{
            border: socialType == 3 ? "3px solid #338A46" : "none",
            padding: socialType == 3 ? 1 : 0,
            borderRadius: 30,
            marginLeft: 9,
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => setSocialType(4)}
          src={process.env.PUBLIC_URL + "/assets/lg_masknetwork.png"}
          width={socialType == 4 ? imgWidthSelected : imgWidth}
          alt="masknetwork"
          css={{
            border: socialType == 4 ? "3px solid #338A46" : "none",
            padding: socialType == 4 ? 1 : 0,
            borderRadius: 30,
            marginLeft: 9,
            cursor: "pointer",
          }}
        />
      </div>
      <div css={SubTitle}>Wallet Address</div>
      {walletConnected ? (
        <input
          css={StyledInput}
          style={{ backgroundColor: "#F2F2F2", border: "2px solid #DDDDDD" }}
          type="text"
          value={address}
          // placeholder="Write your wallet address"
          // onChange={(e) => setAddress(e.target.value)}
          required
          readOnly
        />
      ) : (
        <div css={StyledButton} style={{ marginTop: 0 }}>
          Social Wallet Connect
        </div>
      )}
      <div css={SubTitle}>Group Id</div>
      <input
        css={StyledInput}
        type="text"
        placeholder="Write your social group id"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        required
      />
      {walletConnected ? (
        <div css={StyledButton}>Connect</div>
      ) : (
        <div style={{ backgroundColor: "#DDDDDD" }} css={StyledButton}>
          Connect
        </div>
      )}
    </div>
  );
}
