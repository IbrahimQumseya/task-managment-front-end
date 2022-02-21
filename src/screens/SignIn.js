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

import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

import axios from '../api/newAPI';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f7b22ab2b060675ed6caa23698739396e39606a7
import BasicAlerts from '../components/BasicAlerts';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [enabled, setEnabled] = useState(true);
<<<<<<< HEAD
=======
=======

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
>>>>>>> cypress-end-2-end-home-page
>>>>>>> f7b22ab2b060675ed6caa23698739396e39606a7
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (username && password) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }, [username, password, message]);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f7b22ab2b060675ed6caa23698739396e39606a7
    if (username && password) {
      console.log(enabled);
      try {
        // This request should be moved into slice/userAPI
        const res = await axios.post('/auth/signin', {
          username,
          password,
        });
        const token = res?.data?.accessToken;
        if (token) {
          dispatch(login(token));
          navigate('/home');
        }
      } catch (error) {
<<<<<<< HEAD
        setMessage(error.response.data.message);
=======
        if (error.response.data.statusCode === 401) {
          setMessage(error.response.data.message);
        }
        if (error.response.data.statusCode === 400) {
          setMessage(error.response.data.message);
        }
=======
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
>>>>>>> cypress-end-2-end-home-page
>>>>>>> f7b22ab2b060675ed6caa23698739396e39606a7
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
          {t('SignIn')}
        </Typography>
        <Box sx={{ mt: 1 }} component='form' noValidate onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label={t('userName')}
            value={username}
            onChange={handleChangeUsername}
            autoFocus
            helperText={t('ShouldBeCharacters')}
          />
          <TextField
            required
            fullWidth
            id='password'
            type='password'
            label={t('Password')}
            value={password}
            onChange={handleChangePassword}
            autoComplete='current-password'
            sx={{ mt: 2 }}
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember Me' />
          {message && <BasicAlerts severity='error' message={message} />}
          <Button type='submit' fullWidth disabled={enabled} variant='contained' sx={{ mt: 3, mb: 2, height: 45 }}>
            {t('SignIn')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                {t('forgotPassword')}
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {t('DontHaveAnAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
