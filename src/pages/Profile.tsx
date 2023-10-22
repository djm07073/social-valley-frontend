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
  checkSocial: boolean;
}

export default function Profile({
  setGroupId,
  setCheckChain,
  checkSocial,
}: ProfileProps) {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  //TODO: valley_info_data : ipns1
  const { data: valley_info_data } = useContractRead({
    abi: [
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
    address: CONFIG.base.valley_profile as `0x${string}`,
    functionName: "getSocialAccountInfo",
    args: [address!],
  });

  // hexagon
  const [vely, setVely] = useState(21);
  const [imgUrl, setImgUrl] = useState("");
  const [clsName, setClsName] = useState("");

  // social connect
  const connectSocialArr = ["masknetwork", "friendtech"]; //TODO: mock data => ipns 쿼리로 대체

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

  const showProfile = async () => {
    const parsedQT = await ShowProfile(valley_info_data as string);
  };

  useEffect(() => {
    if (valley_info_data) {
      showProfile();
    }
  }, [valley_info_data]);

  function getTabURL(callback: any) {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs.query(queryInfo, function (tabs) {
      let tab = tabs[0];
      let url = tab.url;
      callback(url);
    });
  }

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

  useEffect(() => {
    getTabURL(function (url: string) {
      renderURL(url);
      if (
        url.includes("https://post.tech/buy-sell/") ||
        url.includes("https://www.friend.tech/")
      ) {
        navigate("/not-following");
      } else if (
        url.includes("https://post.tech/messages/") ||
        url.includes("https://www.friend.tech/rooms")
      ) {
        navigate("/comment");
      }
    });
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
          {checkSocial
            ? connectSocialArr.map((id) => (
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
              ))
            : ""}
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
