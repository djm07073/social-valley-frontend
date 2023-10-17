/** @jsxImportSource @emotion/react */
import { useState } from "react";

export default function Profile() {
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
        <span
          css={{
            display: "inline-block",
            padding: "6px 12px",
            backgroundColor: "#DAE7DA",
            borderRadius: "13px",
            color: "#338A46",
            fontSize: "9pt",
            cursor: "pointer",
          }}
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
        </span>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          height: "270px",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <div className="hexagon" css={{ marginTop: "70px" }}>
          <img
            src={process.env.PUBLIC_URL + "/assets/img_valley_3.png"}
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
            color: "#ED348D",
            fontSize: "20pt",
          }}
        >
          00 vely
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
        <button
          css={{
            padding: "6px 9px",
            background: "none",
            border: "1px solid #ffffff",
            borderRadius: "20px",
            color: "#ffffff",
            fontSize: "10pt",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/ic_plus.png"}
            alt="add"
            css={{
              width: "11px",
              marginRight: "5px",
            }}
          />
          Add
        </button>
      </div>
    </div>
  );
}
