/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface ProfileProps {
  setGroupId: (groupId: string) => void;
}

export default function Profile({ setGroupId }: ProfileProps) {
  const navigate = useNavigate();

  // copy address
  const address = "0x1b0BC52b647e3244e42cA4147c8622F249f6Dad9";

  // hexagon
  const [vely, setVely] = useState(21);
  const [imgUrl, setImgUrl] = useState("");
  const [clsName, setClsName] = useState("");

  // social connect
  const [checkSocial, setCheckSocial] = useState(true); // 1개라도 연결되어 있으면 true
  const connectSocialArr = ["posttech", "starsarena"];

  useEffect(() => {
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
    } else if (statusText.includes("post.tech/buy-sell")) {
      setGroupId(statusText.substring(27));
    } else if (statusText.includes("friend.tech/rooms")) {
      setGroupId(statusText.substring(26));
    } else if (statusText.includes("friend.tech/rooms")) {
      setGroupId(statusText.substring(20));
    }
  }

  useEffect(() => {
    getTabURL(function (url: string) {
      renderURL(url);
      if (
        url.includes("https://post.tech/buy-sell/") ||
        url.includes("https://friend.tech/")
      ) {
        navigate("/not-following");
      } else if (
        url.includes("https://post.tech/messages/") ||
        url.includes("https://friend.tech/rooms")
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
            display: "inline-block",
            padding: "6px 12px",
            backgroundColor: "#DAE7DA",
            border: "none",
            borderRadius: "13px",
            color: "#338A46",
            fontFamily: "Kanit",
            fontSize: "9pt",
            cursor: "pointer",
          }}
          onClick={() => window.navigator.clipboard.writeText(address)}
        >
          0x1b0B…Dad9
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
