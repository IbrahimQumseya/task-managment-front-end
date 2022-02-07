import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import useToken from "../components/useToken";
import CollapsibleTable from "../components/CollapsiableTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home({ setToken }) {
  //token, , setIsAuthenticated, isAuthenticated
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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
    return <SignIn setToken={setToken} />;
    // return <SignIn />;
  }
  // else {
  //   setIsAuthenticated(true);
  // }
  return <CollapsibleTable />;
}

export default Home;
