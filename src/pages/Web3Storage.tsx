/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

function Web3Storage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("groupId");

    const [groupId, setGroupId] = useState("{Group id}");
    const [vely, setVely] = useState(0);
    const [chooseGood, setChooseGood] = useState(false);
    const [chooseBad, setChooseBad] = useState(false);
    const [comment, setComment] = useState("");


    type State = {
        followers: string;
        following: string;
        buyPrice: string;
        sellPrice: string;
    };

    type reputation = {
        valley_address: string;
        good_reputation: number;
        bad_reputation: number;
        comment: string[];
        state: State[];
    };

    const mockReputation: reputation = {
        valley_address: "0xf768a8FD04c16193aCd2F613b8374C1D7e521509",
        good_reputation: 20,
        bad_reputation: 30,
        comment: ["나의 악마", "나의 천사", "좋은 사람"],
        state: [],
    };

    const SubTitle = css`
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 400;
  `;
    const StyledInput = css`
    width: 100%;
    padding: 10px 12px;
    height: 39px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 7px;
    border: 2px solid #dddddd;
  `;
    const StyledButton = css`
    margin-top: 25px;
    padding: 10px 0px;
    background-color: #338a46;
    width: 100%;
    height: 38px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 7px;
    text-align: center;
    color: white;
    cursor: pointer;
  `;

    function chooseOpinion(value: String) {
        if (value == "good") {
            setChooseGood(true);
            setChooseBad(false);
        } else {
            setChooseGood(false);
            setChooseBad(true);
        }
    }

    return (
        <div
            css={{
                padding: "37px 25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div
                css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <img
                    src={process.env.PUBLIC_URL + "/assets/img_valley_2.png"}
                    width={78}
                    alt="valley_2"
                    css={{ marginTop: 13, marginBottom: 15 }}
                />
                {/* <div css={{ fontSize: 12, fontWeight: 400, marginBottom: 3 }}>
                    {groupId}
                </div>
                <div
                    css={{
                        fontSize: 18,
                        fontWeight: 500,
                        marginBottom: 10,
                        color: "#338A46",
                    }}
                >
                    {vely} vely
                </div> */}
            </div>
            <div
                css={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <img
                        onClick={() => chooseOpinion("good")}
                        src={
                            process.env.PUBLIC_URL + "/assets/ic_good_on.png"
                        }
                        width={62}
                        alt="ic_good"
                        css={{ cursor: "pointer" }}
                    />{mockReputation.good_reputation}</div>
                <div>
                    <img
                        onClick={() => chooseOpinion("bad")}
                        src={
                            process.env.PUBLIC_URL + "/assets/ic_bad_on.png"
                        }
                        width={62}
                        alt="ic_bad"
                        css={{ marginLeft: 24, cursor: "pointer" }}
                    />{mockReputation.bad_reputation}</div>
            </div>
            <div css={SubTitle}>Comments</div>
            {mockReputation.comment.map((comment, index) => (
                <div key={index}>{comment}</div>
            ))}
            <div css={StyledButton}>Save</div>
        </div>
    );
}

export default Web3Storage;