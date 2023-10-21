/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import axios from "axios";

const BioSwiper = () => {
  type LinkData = {
    link: string;
    handle: string;
  };

  type BioData = {
    address: string;
    identity: string;
    platform: string;
    displayName: string;
    avatar: string;
    email: string | null;
    description: string | null;
    location: string | null;
    header: string | null;
    links: {
      twitter?: LinkData;
      github?: LinkData;
      website?: LinkData;
      instagram?: LinkData;
      lenster?: LinkData;
      farcaster?: LinkData;
    };
  };

  const [bioData, setBioData] = useState<BioData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getBioData();
  }, []);

  const getBioData = async () => {
    try {
      const response = await axios.get(
        "https://api.web3.bio/profile/0x028f936e528de34fc95179780751ec21256825ce604950580978a8961c5af03e50"
      );
      setBioData(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      css={{
        width: "80%",
      }}
    >
      {bioData.map((item, index) => (
        <SwiperSlide>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              background: "#ffffff",
              border: "1px solid #dddddd",
              boxShadow: "0 0  10px #00000040",
            }}
          >
            <img
              src={item.avatar}
              alt={item.displayName}
              css={{
                width: "200px",
                height: "200px",
              }}
            />
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                fontSize: "12pt",
                fontWeight: "300",
              }}
            >
              <div css={{ fontSize: "14pt", fontWeight: "500" }}>
                {item.displayName}
              </div>
              {item.email && <div>{item.email}</div>}
              {item.description && <div>{item.description}</div>}
              {item.location && <div>{item.location}</div>}
            </div>
            <div css={{ marginTop: "10px" }}>
              {Object.entries(item.links).map(([key, linkData]) => (
                <a
                  key={key}
                  href={linkData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`/assets/img_${key}.png`}
                    alt={key}
                    width="24"
                    height="24"
                    css={{
                      marginRight: "5px",
                      float: "right",
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BioSwiper;
