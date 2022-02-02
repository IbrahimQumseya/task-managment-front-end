import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import useToken from "../components/useToken";
import CollapsibleTable from "../components/CollapsiableTable";
import { useNavigate } from "react-router-dom";

function Home({ token, setToken, setIsAuthenticated, isAuthenticated }) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!accessToken) {
  //     setIsAuthenticated(true);
  //     navigate("/login");
  //     console.log("ssss");
  //   }
  // }, []);
  // const token = getToken();
  // const { token, setToken } = useToken();
  // const token = getToken();
  if (!isAuthenticated) {
    setIsAuthenticated(false);

    return (
      <SignIn setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
    );
    // return <SignIn />;
  } else {
    setIsAuthenticated(true);
  }
  return <CollapsibleTable />;
}

export default Home;
