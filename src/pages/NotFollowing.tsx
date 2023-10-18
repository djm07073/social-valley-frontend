/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

export default function NotFollowing() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("groupId");

  const [groupId, setGroupId] = useState("{Group id}");
  const [vely, setVely] = useState(0);

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
      <div css={StyledButtonHexagon}>Web3 storage</div>
      <div css={StyledButtonHexagon}>Mask network</div>
    </div>
  );
}
