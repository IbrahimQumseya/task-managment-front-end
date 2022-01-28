import React, { useState } from "react";
import SignIn from "./SignIn";
import useToken, { getToken } from "../components/useToken";

function Home() {
  // const token = getToken();
  const { token, setToken } = useToken();
  // const token = getToken();
  if (!token) {
    return <SignIn setToken={setToken} />;
    // return <SignIn />;
  }
  return <div>HOOOOOOOOOOOME</div>;
}

export default Home;
