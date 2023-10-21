/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as Name from "w3name";
import { IPNSCreateAndUpload } from "../filecoin/IPNSCreateAndUpload";

export default function ConnectWallet() {
  const StyledButtonHexagon = css`
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

  const address = "0x123";

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
        src={process.env.PUBLIC_URL + "/assets/lg_valley.png"}
        width={102}
        alt="valley"
        css={{ marginBottom: 78, marginTop: 100 }}
      />
      <div css={StyledButtonHexagon}>Connect Wallet</div>
      <div
        css={{
          position: "relative",
          left: -107,
          bottom: 43,
          borderTop: "24px solid white",
          borderRight: "24px solid transparent",
        }}
      />

      <div
        css={{
          position: "relative",
          right: -107,
          bottom: 67,
          borderTop: "24px solid white",
          borderLeft: "24px solid transparent",
        }}
      />
      <div
        css={{
          position: "relative",
          left: -107,
          bottom: 69,
          borderBottom: "24px solid white",
          borderRight: "24px solid transparent",
        }}
      />
      <button onClick={() => IPNSCreateAndUpload(address)}>IPNS_CREATE</button>

      <div
        css={{
          position: "relative",
          right: -107,
          bottom: 93,
          borderBottom: "24px solid white",
          borderLeft: "24px solid transparent",
        }}
      />
    </div>
  );
}
