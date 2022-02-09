import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import CollapsibleTable from "../components/CollapsiableTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import AddATask from "../features/tasks/AddATask";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
  if (!isAuthenticated) {
    return <SignIn />;
  }
  return (
    <Container maxWidth="lg">
      <AddATask />
      <CollapsibleTable />
    </Container>
  );
}

export default Home;
