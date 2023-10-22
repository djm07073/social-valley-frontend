/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config/chainleader";
import { ShowProfile } from "../filecoin/ShowProfile";
import { Contract, JsonRpcApiProvider, JsonRpcProvider } from "ethers";
import { ValleyProfile } from "../components/ValleyProfile";

const selectValley = [
  {
    img: "/assets/img_valley_1.png",
    className: "hexagon",
  },
  {
    img: "/assets/img_valley_2.png",
    className: "hexagon hexagon-green",
  },
  {
    img: "/assets/img_valley_3.png",
    className: "hexagon hexagon-aurora",
  },
];

interface ISocialImg {
  [key: string]: string;
}

const socialImg: ISocialImg = {
  posttech: "/assets/lg_posttech.png",
  friendtech: "/assets/lg_friendtech.png",
  starsarena: "/assets/lg_starsarena.png",
  masknetwork: "/assets/lg_masknetwork.png",
};
const provider = new JsonRpcProvider("https://base.llamarpc.com");
const profile = new Contract(
  CONFIG.base.valley_profile,
  [
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "getSocialAccountInfo",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  provider
);
interface ProfileProps {
  setGroupId: (groupId: string) => void;
  setCheckChain: (checkChain: string) => void;
}
export default function Profile({ setGroupId, setCheckChain }: ProfileProps) {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  //TODO: valley_info_data : ipns1

  // hexagon
  const [vely, setVely] = useState(21);
  const [imgUrl, setImgUrl] = useState("");
  const [clsName, setClsName] = useState("");

  // social connect
  const [checkSocial, setCheckSocial] = useState(true); // 1개라도 연결되어 있으면 true
  const connectSocialArr = ["posttech", "starsarena"]; //TODO: mock data => ipns 쿼리로 대체

  useEffect(() => {
    if (!isConnected) navigate("/connect-wallet");

    if (vely < -20) {
      setImgUrl(selectValley[0].img);
      setClsName(selectValley[0].className);
    } else if (vely > 20) {
      setImgUrl(selectValley[2].img);
      setClsName(selectValley[2].className);
    } else {
      setImgUrl(selectValley[1].img);
      setClsName(selectValley[1].className);
    }
  }, [vely]);

  function renderURL(statusText: string) {
    if (statusText.includes("post.tech/messages/group")) {
      setGroupId(statusText.substring(33));
      setCheckChain("POST");
    } else if (statusText.includes("post.tech/buy-sell")) {
      setGroupId(statusText.substring(27));
      setCheckChain("POST");
    } else if (statusText.includes("www.friend.tech/rooms")) {
      setGroupId(statusText.substring(30));
      setCheckChain("FRIEND");
    } else if (statusText.includes("www.friend.tech/")) {
      setGroupId(statusText.substring(24));
      setCheckChain("FRIEND");
    }
  }

  const retreive_valley_info_data = async () => {
    const valley_info_data = await ValleyProfile(address as string);
    const res = await ShowProfile(valley_info_data as string);
    const parsedQT = res![0];

    const connectedSocials = [];
    if (parsedQT.friend_tech === "") {
      console.log("friend_tech not connected");
    } else {
      connectedSocials.push("FRIEND");
    }

    if (parsedQT.next_id === "") {
      console.log("next_id not connected");
    } else {
      connectedSocials.push("MASK");
    }

    if (parsedQT.post_tech.address === "") {
      console.log("post_tech not connected");
    } else {
      connectedSocials.push("POST");
    }

    if (parsedQT.stars_arena.address === "") {
      console.log("stars_arena not connected");
    } else {
      connectedSocials.push("STARS");
    }

    console.log(parsedQT);
    console.log("connectedSocials", connectedSocials);
    return connectedSocials;
  };

  useEffect(() => {
    retreive_valley_info_data();
  }, []);

  return (
    <div
      css={{
        height: "100%",
        backgroundColor: "#338A46",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          height: "50px",
          backgroundColor: "#ffffff",
        }}
      >
        <button
          css={{
            display: "flex",
            padding: "6px 12px",
            alignItems: "center",
            backgroundColor: "#DAE7DA",
            border: "none",
            borderRadius: "13px",
            color: "#338A46",
            fontFamily: "Kanit",
            fontSize: "9pt",
            cursor: "pointer",
          }}
          onClick={() => window.navigator.clipboard.writeText(address!)}
        >
          <div
            css={{ width: 84, textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {address}
          </div>
          <img
            src={process.env.PUBLIC_URL + "/assets/ic_copy.png"}
            alt="copy"
            css={{
              width: "10px",
              marginLeft: "5px",
            }}
          />
        </button>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "270px",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <div className={clsName} css={{ marginTop: "70px" }}>
          <img
            src={process.env.PUBLIC_URL + imgUrl}
            alt="valley"
            css={{
              position: "absolute",
              top: "-20px",
              left: "10px",
              width: "88px",
              height: "102px",
              zIndex: "1",
            }}
          />
        </div>
        <h1
          css={{
            marginTop: "40px",
            color: "#FF7B54",
            fontSize: "20pt",
          }}
        >
          {vely} vely
        </h1>
      </div>
      <div
        css={{
          padding: "30px 20px",
        }}
      >
        <h4
          css={{
            margin: "0",
            marginBottom: "10px",
            color: "#ffffff",
            fontSize: "12pt",
            fontWeight: "300",
          }}
        >
          Connected social accounts
        </h4>
        {/* 연결된 소셜 아이콘 배치 */}
        <div css={{ display: "flex" }}>
          {connectSocialArr.map((id) => (
            <div
              css={{
                width: "27px",
                height: "27px",
                marginRight: "5px",
                borderRadius: "27px",
                overflow: "hidden",
              }}
            >
              <img
                css={{ width: "27px", height: "27px" }}
                src={socialImg[id]}
                alt={id}
              />
            </div>
          ))}
          <button
            onClick={() => navigate("/add-social-accounts")}
            css={
              checkSocial
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "27px",
                    height: "27px",
                    background: "none",
                    border: "1px solid #ffffff",
                    borderRadius: "27px",
                    cursor: "pointer",
                  }
                : {
                    padding: "6px 9px",
                    background: "none",
                    border: "1px solid #ffffff",
                    borderRadius: "20px",
                    color: "#ffffff",
                    fontSize: "10pt",
                    cursor: "pointer",
                  }
            }
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/ic_plus.png"}
              alt="add"
              css={
                checkSocial
                  ? {
                      width: "11px",
                    }
                  : {
                      width: "11px",
                      marginRight: "5px",
                    }
              }
            />
            {checkSocial ? null : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
