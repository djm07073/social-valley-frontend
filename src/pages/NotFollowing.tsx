/** @jsxImportSource @emotion/react */
import { useState } from "react";

export default function NotFollowing() {
  const [groupId, setGroupId] = useState("{Group id}");
  const [vely, setVely] = useState(0);

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
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/lg_web3_storage.png"}
          width={14}
          alt="web3_storage"
        />
        <div css={{ marginLeft: 6, fontSize: 12, fontWeight: 300 }}>
          Web3 storage
        </div>
      </div>
      <div
        css={{
          width: 236,
          height: 42,
          textAlign: "center",
          padding: "10px 0px",
          backgroundColor: "#338A46",
          fontSize: 14,
          color: "white",
          cursor: "pointer",
          fontWeight: 300,
        }}
      >
        Check this user
      </div>
    </div>
  );
}
