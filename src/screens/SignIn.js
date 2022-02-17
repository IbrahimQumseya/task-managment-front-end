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
} from '@mui/material';

import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/user/userSlice';

import axios from '../api/newAPI';

async function loginUser(credentials) {
  try {
    const res = await axios.post('/auth/signin', credentials);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
}

export default function SignIn() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target[0].value && e.target[2].value) {
      // setUserName
      const token = await loginUser({
        username: e.target[0].value,
        password: e.target[2].value,
      });
      if (token.accessToken) {
        dispatch(login(token.accessToken));

        navigate('/home');
      } else {
        dispatch(logout());
        navigate('/login');
      }
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <Box sx={{ mt: 1 }} component='form' noValidate onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            type='password'
            label='Password'
            name='password'
            autoComplete='current-password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember Me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, height: 45 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
