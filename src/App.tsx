/** @jsxImportSource @emotion/react */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import ConnectWallet from "./pages/ConnectWallet";
import Profile from "./pages/Profile";
import AddSocialAccounts from "./pages/AddSocialAccounts";
import Comment from "./pages/Comment";
import NotFollowing from "./pages/NotFollowing";

export default function App() {
  // check Social Site
  const [groupId, setGroupId] = useState("");
  const [checkChain, setCheckChain] = useState("");

  const router = createBrowserRouter([
    {
      path: "/connect-wallet",
      element: <ConnectWallet />,
    },
    {
      path: "/profile",
      element: (
        <Profile setGroupId={setGroupId} setCheckChain={setCheckChain} />
      ),
    },
    {
      path: "/add-social-accounts",
      element: <AddSocialAccounts />,
    },
    {
      path: "/comment",
      element: <Comment groupId={groupId} checkChain={checkChain} />,
    },
    {
      path: "/not-following",
      element: <NotFollowing groupId={groupId} checkChain={checkChain} />,
    },
    {
      path: "*",
      element: (
        <Profile setGroupId={setGroupId} setCheckChain={setCheckChain} />
      ),
    },
  ]);

  return (
    <div css={{ width: "300px", height: "450px" }}>
      <RouterProvider router={router} />
    </div>
  );
}
