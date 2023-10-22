import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig, mainnet } from "wagmi";
import { arbitrum, base, avalanche } from "wagmi/chains";
import "./index.css";

const projectId = "0525c5b585040cf25b4c5274ba3e4fbf";

const metadata = {
  name: "Web3Modal",
  description: "social-valley",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum, base, avalanche];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <WagmiConfig config={wagmiConfig}>
    <App />
  </WagmiConfig>
);
