/** @jsxImportSource @emotion/react */

export default function ConnectWallet() {
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
      />
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 45,
          marginBottom: 14,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/lg_polygon.png"}
          width={14}
          alt="polygon"
        />
        <div css={{ marginLeft: 6, fontSize: 12, fontWeight: 300 }}>
          Polygon
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
        Connect Wallet
      </div>
    </div>
  );
}
