/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

export default function AddSocialAccounts() {
  const [address, setAddress] = useState("");
  const [groupId, setGroupId] = useState("");

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
  const imgMargin = css`
    margin-left: 9px;
  `;
  const imgWidth = 56;

  return (
    <div
      css={{
        padding: "19px 25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <i className="fas fa-arrow-left" css={{ cursor: "pointer" }}></i>
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
          src={process.env.PUBLIC_URL + "/assets/lg_friend3.png"}
          width={imgWidth}
          alt="friend3"
        />
        <img
          src={process.env.PUBLIC_URL + "/assets/lg_friendtech.png"}
          width={imgWidth}
          alt="friendtech"
          css={imgMargin}
        />
        <img
          src={process.env.PUBLIC_URL + "/assets/lg_masknetwork.png"}
          width={imgWidth}
          alt="masknetwork"
          css={imgMargin}
        />
        <img
          src={process.env.PUBLIC_URL + "/assets/lg_posttech.png"}
          width={imgWidth}
          alt="posttech"
          css={imgMargin}
        />
      </div>
      <div css={SubTitle}>Wallet Address</div>
      <input
        css={StyledInput}
        type="text"
        placeholder="Write your wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <div css={SubTitle}>Group Id</div>
      <input
        css={StyledInput}
        type="text"
        placeholder="Write your social group id"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        required
      />
      <div
        css={{
          marginTop: "25px",
          padding: "10px 0px",
          backgroundColor: "#338A46",
          width: "100%",
          height: 38,
          fontSize: 12,
          fontWeight: 400,
          borderRadius: 7,
          textAlign: "center",
          color: "white",
          cursor: "pointer",
        }}
      >
        Connect
      </div>
    </div>
  );
}
