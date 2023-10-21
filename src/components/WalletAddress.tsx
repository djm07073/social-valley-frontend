/** @jsxImportSource @emotion/react */
import { SerializedStyles } from "@emotion/react";
import { useAccount, useDisconnect } from "wagmi";
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
  const { isConnected } = useAccount();

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
        isConnected ? (
          <input
            css={StyledInput}
            style={{ backgroundColor: "#F2F2F2", border: "2px solid #DDDDDD" }}
            type="text"
            value={address}
            required
            readOnly
          />
        ) : (
          <w3m-button />
        )
      ) : (
        <div
          onClick={() => {
            disconnect();
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
