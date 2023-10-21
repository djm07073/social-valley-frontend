/** @jsxImportSource @emotion/react */
import { SerializedStyles } from "@emotion/react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";

export default function WalletAddress({
  hidden,
  socialType,
  address,
  SubTitle,
  StyledInput,
  StyledButton,
  setActiveButton,
}: {
  hidden: boolean;
  socialType: any;
  address: any;
  SubTitle: SerializedStyles;
  StyledInput: SerializedStyles;
  StyledButton: SerializedStyles;
  setActiveButton: Function;
}) {
  const [preAddress, setPreAddress] = useState(address);
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  useEffect(() => {
    setPreAddress(address);
  }, []);

  useEffect(() => {
    console.log(preAddress);
    console.log(address);

    if (socialType == "MASK" && preAddress != address) {
      setActiveButton(true);
    }
  });

  return !hidden ? (
    <div>
      <div css={SubTitle}>Wallet Address</div>
      {preAddress != address ? (
        <input
          css={StyledInput}
          style={{ backgroundColor: "#F2F2F2", border: "2px solid #DDDDDD" }}
          type="text"
          value={address}
          required
          readOnly
        />
      ) : (
        <div
          onClick={async () => {
            await disconnect();
            open();
          }}
          css={StyledButton}
          style={{ marginTop: 0 }}
        >
          Social Wallet Connect
        </div>
      )}
    </div>
  ) : (
    <div />
  );
}
