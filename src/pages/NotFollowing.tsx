/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function NotFollowing() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("groupId");

  const [groupId, setGroupId] = useState("{Group id}");
  const [vely, setVely] = useState(0);

  const handleMaskClick = async () => {
    // try {
    //   const response = await axios.get('/web3bio/getNextID');
    //   const responseData = response.data;
  
    //   if (responseData && responseData.next_id) {
    //     const { next_id } = responseData;
    //     getBioData(next_id);
    //     console.log(next_id);
    //   } else {
    //     console.error('서버 응답에 유효한 데이터가 없습니다.');
    //   }
    // } catch (error) {
    //   console.error('에러 발생:', error);
    // }
    navigate('/web3bio');
  };
      // const response = await axios.get(`https://api.web3.bio/profile/${nextId}`);

  // const getBioData = async (nextId: string) => {
  // const getBioData = async()  => {
  //   try {
  //     const response = await axios.get('https://api.web3.bio/profile/0x0332a5c1b5b32d42be0fc5342c26c8e538701392e4405a430d2bfb16d89f366b0d');
  //     const bioData = response.data;

  //     for (let i = 0; i < bioData.length; i++) {
  //       console.log(bioData[i].address);
  //       console.log(bioData[i].identity);
  //       console.log(bioData[i].platform);
  //       console.log(bioData[i].displayName);
  //     }
  //   } catch (error) {
  //     console.error('에러 발생:', error);
  //   }
  // };

  const StyledButtonHexagon = css`
    margin-top: 10px;
    width: 236px;
    height: 42px;
    text-align: center;
    padding: 10px 0px;
    background-color: #338a46;
    font-size: 14px;
    color: white;
    cursor: pointer;
    font-weight: 300;
  `;

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
      <div css={{ fontSize: 12, fontWeight: 300, marginBottom: 2 }}>
        Check this user
      </div>
      <div css={StyledButtonHexagon}>Web3 storage</div>
      <div onClick={handleMaskClick} css={StyledButtonHexagon}>Mask network</div>
    </div>
  );
}
