import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import axios from '../api/newAPI';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('demo.user');
  const [password, setPassword] = useState('••••••••');
  const [message, setMessage] = useState('');
  const [enabled, setEnabled] = useState(true);
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

    if (username && password) {
      try {
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
        setMessage(error.response?.data?.message || 'Unable to sign in');
      }
    }
  };

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 4, md: 8 } }}>
      <Grid container spacing={4} alignItems='stretch'>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 520 }}>
            <Typography
              sx={{
                display: 'inline-flex',
                px: 1.5,
                py: 0.75,
                mb: 2,
                borderRadius: 999,
                bgcolor: 'rgba(56, 189, 248, 0.12)',
                color: '#7dd3fc',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              React · Redux Toolkit · Material UI
            </Typography>
            <Typography component='h1' variant='h4' sx={{ mb: 2 }}>
              Task Board Client
            </Typography>
            <Typography color='text.secondary' sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
              Portfolio demo for authentication, protected routes, and task CRUD with centralized Redux state.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: 'rgba(17, 24, 39, 0.92)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h2' variant='h5'>
                {t('SignIn')}
              </Typography>
              <Box sx={{ mt: 2, width: '100%' }} component='form' noValidate onSubmit={handleSubmit}>
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
                <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                {message ? (
                  <Typography color='error' variant='body2' sx={{ mt: 1 }}>
                    {message}
                  </Typography>
                ) : null}
                <Button type='submit' fullWidth disabled={enabled} variant='contained' sx={{ mt: 3, mb: 2, height: 48 }}>
                  {t('SignIn')}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2' color='text.secondary'>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
