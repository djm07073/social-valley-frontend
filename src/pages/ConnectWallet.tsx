/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useNavigate } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { IPNSCreateAndUpload } from "../filecoin/IPNSCreateAndUpload";
import useMakeProfile from "../hooks/useMakeProfile";
import { useEffect } from "react";
export default function ConnectWallet() {
  const { setName, setProfile, makeProfile, chain, switchNetwork } =
    useMakeProfile();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const { open } = useWeb3Modal();

  const handleConnect = async () => {
    if (chain?.id !== 8453) {
      switchNetwork?.(8453);
    }
    if (address) {
      const { nameBytesString, profileNameBytesString } =
        await IPNSCreateAndUpload(address);

      setName(nameBytesString);
      setProfile(profileNameBytesString);
    }

    // To Do (BeakerJin): add ipns to smart contract mapping
  };

  useEffect(() => {
    if (isConnected) navigate("/profile");
  }, []);

  const StyledButtonHexagon = css`
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
        src={process.env.PUBLIC_URL + "/assets/lg_valley.png"}
        width={102}
        alt="valley"
        css={{ marginBottom: 78, marginTop: 100 }}
      />
      {address ? (
        <div
          onClick={async () => {
            handleConnect();
            makeProfile();
            if (isConnected) navigate("/profile");
          }}
          css={StyledButtonHexagon}
        >
          Make Profile
        </div>
      ) : (
        // <div
        //   onClick={async () => {
        //     await open();
        //   }}
        //   css={StyledButtonHexagon}
        // >
        //   Connect Wallet
        // </div>
        <w3m-button />
      )}

      <div
        css={{
          position: "relative",
          left: -107,
          bottom: 43,
          borderTop: "24px solid white",
          borderRight: "24px solid transparent",
        }}
      />

      <div
        css={{
          position: "relative",
          right: -107,
          bottom: 67,
          borderTop: "24px solid white",
          borderLeft: "24px solid transparent",
        }}
      />
      <div
        css={{
          position: "relative",
          left: -107,
          bottom: 69,
          borderBottom: "24px solid white",
          borderRight: "24px solid transparent",
        }}
      />
      <div
        css={{
          position: "relative",
          right: -107,
          bottom: 93,
          borderBottom: "24px solid white",
          borderLeft: "24px solid transparent",
        }}
      />
    </div>
  );
}
