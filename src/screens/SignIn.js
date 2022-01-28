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

import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

async function loginUser(credentials) {
  return fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function SignIn({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    // const allData = {
    //   email: data.get("email"),
    //   password: data.get("password"),
    // };
    setPassword(data.get("password"));
    setUserName(data.get("email"));

    if (username && password) {
      const token = await loginUser({
        username,
        password,
      });
      if (token) {
        setToken(token.accessToken);

        navigate("/home");
      }

      // console.log("handletoken", handleToken);
      // axios
      //   .post("http://localhost:3000/auth/signin", {
      //     username,
      //     password,
      //   })
      //   .then(function (response) {
      //     setToken(response.data.accessToken);
      //     console.log(Token);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
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
          Sign In
        </Typography>
        <Box sx={{ mt: 1 }} component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            label="Password"
            name="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember Me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 45 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};
