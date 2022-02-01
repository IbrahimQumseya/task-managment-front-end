import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import useToken from "../components/useToken";
import CollapsibleTable from "../components/CollapsiableTable";
import { useNavigate } from "react-router-dom";

function Home({ token, setToken }) {
  const navigate = useNavigate();
  const [accessToken,setAccessToken] = useState(token);
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      console.log('ssss');
    }
  }, []);
  // const token = getToken();
  // const { token, setToken } = useToken();
  // const token = getToken();
  if (!accessToken) {
    return <SignIn setAccessToken={setAccessToken} />;
    // return <SignIn />;
  }
  return <CollapsibleTable />;
}

export default Home;
