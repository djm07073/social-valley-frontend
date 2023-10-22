/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import BioSwiper from "../components/BioSwiper";

function Web3Bio() {
  const navigate = useNavigate();

  return (
    <div
      css={{
        height: "100%",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "50px",
          padding: "0 22px",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          onClick={() => navigate("/not-following")}
          src={process.env.PUBLIC_URL + "/assets/lg_back.png"}
          width={14}
          css={{ cursor: "pointer" }}
          alt=""
        />
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 20px 20px",
          overflow: "hidden",
        }}
      >
        <BioSwiper />
      </div>

      <div
        css={{
          padding: "30px 20px",
        }}
      ></div>
    </div>
  );
}

export default Web3Bio;
