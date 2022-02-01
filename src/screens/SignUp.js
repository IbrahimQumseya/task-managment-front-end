import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

function SignUp() {

  const history = useNavigate();
  const fetchAllData = (allData) => {
    axios
      .post("http://localhost:3000/auth/signup", {
        firstName: allData.firstName,
        lastName: allData.lastName,
        email: allData.email,
        password: allData.password,
        username: allData.username,
      })
      .then(function (response) {
        if (response.data === "USER_CREATED" && response.status === 201) {
          // alert("the user have been created!");
          console.log(history);
          history("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
        // if (error.request.status === 409) {
        //   alert("the username already exists!"); // Alert mui
        // }
        // console.log(error.request.status);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const allData = {
      email: data.get("email"),
      lastName: data.get("lastName"),
      firstName: data.get("firstName"),
      password: data.get("password"),
      passwordConform: data.get("passwordConform"),
      username: data.get("username"),
    };
    if (
      allData.email &&
      allData.firstName &&
      allData.lastName &&
      allData.password &&
      allData.passwordConform &&
      allData.username
    ) {
      if (allData.password === allData.passwordConform) {
        // here we work to fetch data POST
        fetchAllData(allData);
      } else {
        alert("password and conform password doesnt match");
      }
    } else {
      alert("you should fill every field ");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sigh Up
        </Typography>
        <Box sx={{ m1: 3 }} component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Password"
            type="password"
            label="Password"
            name="password"
            autoComplete="Password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="passwordConform"
            type="password"
            label="Conform Password"
            name="passwordConform"
            autoComplete="passwordConform"
          />
          <FormControlLabel
            label="i accept the terms"
            control={<Checkbox value="terms" color="primary" />}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
