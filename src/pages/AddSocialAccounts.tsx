/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

export default function AddSocialAccounts() {
  const [address, setAddress] = useState("");
  const [groupId, setGroupId] = useState("");
  const [socialType, setSocialType] = useState(0);

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
          src={process.env.PUBLIC_URL + "/assets/lg_friend3.png"}
          width={socialType == 3 ? imgWidthSelected : imgWidth}
          alt="friend3"
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
      <div css={StyledButton}>Connect</div>
    </div>
  );
}
