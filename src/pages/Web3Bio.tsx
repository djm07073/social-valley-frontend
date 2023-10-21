/** @jsxImportSource @emotion/react */
import React from 'react';
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Web3Bio() {
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
    const navigate = useNavigate();
    const [bioData, setBioData] = useState<BioData[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleNext = () => {
        if (activeIndex < bioData.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    // copy address
    const { address, isConnected } = useAccount();

    // hexagon
    const [vely, setVely] = useState(21);
    const [imgUrl, setImgUrl] = useState("");
    const [clsName, setClsName] = useState("");

    // social connect
    const [checkSocial, setCheckSocial] = useState(true); // 1개라도 연결되어 있으면 true
    const connectSocialArr = ["posttech", "starsarena"];

    useEffect(() => {
        getBioData();
    }, []);

    const getBioData = async () => {
        try {
            const response = await axios.get('https://api.web3.bio/profile/0x028f936e528de34fc95179780751ec21256825ce604950580978a8961c5af03e50');
            setBioData(response.data);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

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
                    backgroundColor: "#ffffff",
                }}
            >
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
                <div css={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <button
                        onClick={handlePrev}
                        css={{
                            marginRight: "10px",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "24px",
                        }}
                    >
                        &lt;
                    </button>

                    <div css={{ display: "flex", flexDirection: "column" }}>
                        <div css={{ display: "flex", flexDirection: "column" }}>
                            <div
                                css={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {bioData.map((item, index) => (
                                    <div
                                        css={{
                                            display: activeIndex === index ? "flex" : "none",
                                            backgroundColor: "#f3f3f3",
                                            marginBottom: "10px",
                                            width: "230px",
                                            padding: "10px",
                                            borderRadius: "20px",
                                            flexDirection: "column"
                                        }}
                                        key={index}
                                    >
                                        <div css={{ display: "flex", marginBottom: "10px" }}>
                                            <div>
                                                <img src={item.avatar} alt={item.displayName} width="50" height="50" />
                                            </div>
                                            <div css={{ marginLeft: "10px", display: "flex", flexDirection: "column", fontSize: "12px" }}>
                                                <div>{item.displayName}</div>
                                                {item.email && <div>{item.email}</div>}
                                                {item.description && <div>{item.description}</div>}
                                                {item.location && <div>{item.location}</div>}
                                            </div>
                                        </div>
                                        <div css={{ marginBottom: "0px" }}>
                                            {Object.entries(item.links).map(([key, linkData]) => (
                                                <a key={key} href={linkData.link} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={`/assets/img_${key}.png`} // Dynamically set the image source based on the platform
                                                        alt={key}
                                                        width="24"
                                                        height="24"
                                                        css={{
                                                            marginRight: "5px",
                                                            float: "right" 
                                                        }}
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <button
                        onClick={handleNext}
                        css={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "24px",
                            marginLeft: "10px"
                        }}
                    >
                        &gt;
                    </button>
                </div>
                <div css={{ display: "flex", flexDirection: "row" }}>
                    {bioData.map((item, index) => (
                        <div key={index} css={{ marginLeft: "5px" }}>
                            <div
                                css={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    backgroundColor: activeIndex === index ? "black" : "#ccc",
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                    ))}
                </div>

            </div>

            <div
                css={{
                    padding: "30px 20px",
                }}
            >
            </div>
        </div>
    );
}


export default Web3Bio;