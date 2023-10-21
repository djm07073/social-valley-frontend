/** @jsxImportSource @emotion/react */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ConnectWallet from "./pages/ConnectWallet";
import Profile from "./pages/Profile";
import AddSocialAccounts from "./pages/AddSocialAccounts";
import Comment from "./pages/Comment";
import NotFollowing from "./pages/NotFollowing";
import Web3Bio from "./pages/Web3Bio";
import Web3Storage from "./pages/Web3Storage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/web3bio",
      element: <Web3Bio />,
    },
    {
      path: "/web3storage",
      element: <Web3Storage />,
    },
    {
      path: "/connect-wallet",
      element: <ConnectWallet />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/add-social-accounts",
      element: <AddSocialAccounts />,
    },
    {
      path: "/comment",
      element: <Comment />,
    },
    {
      path: "/not-following",
      element: <NotFollowing />,
    },
    {
      path: "*",
      element: <Profile />,
    },
  ]);
  return (
    <div css={{ width: "300px", height: "450px" }}>
      <RouterProvider router={router} />
    </div>
  );
}
