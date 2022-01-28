import React from "react";
import useToken from "../components/useToken";
import SignIn from "./SignIn";

function Home() {
  const { token, setToken } = useToken();
  const handleToken = (e) => {
    setToken(e);
  };
  if (!token) {
    return <SignIn handleToken={handleToken} />;
  }
  return <div>HOOOOOOOOOOOME</div>;
}

export default Home;
