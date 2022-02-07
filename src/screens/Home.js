import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import CollapsibleTable from "../components/CollapsiableTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import AddATask from "../features/tasks/AddATask";

function Home() {
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
  console.log("alskd;asl", isAuthenticated);
  if (!isAuthenticated) {
    return <SignIn />;
    // return <SignIn />;
  }
  // else {
  //   setIsAuthenticated(true);
  // }
  return (
    <Container maxWidth="lg">
      <AddATask />
      <CollapsibleTable />
    </Container>
  );
}

export default Home;
