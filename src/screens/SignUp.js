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

import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAllData } from '../api/taskAPI';

function SignUp() {
  const { t } = useTranslation();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const allData = {
      email: data.get('email'),
      lastName: data.get('lastName'),
      firstName: data.get('firstName'),
      password: data.get('password'),
      passwordConform: data.get('passwordConform'),
      username: data.get('username'),
    };
    if (
      allData.email &&
      allData.firstName &&
      allData.lastName &&
      allData.password &&
      allData.passwordConform &&
      allData.username
    ) {
      console.log(allData.password, allData.passwordConform);
      if (allData.password === allData.passwordConform) {
        // here we work to fetch data POST
        try {
          fetchAllData(allData);
          history('/login');
        } catch (error) {
          throw new Error(error);
        }
      } else {
        alert(t(`doesntMatch`));
      }
    } else {
      alert(t('shouldFill'));
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
          {t('SighUp')}
        </Typography>
        <Box sx={{ m1: 3 }} component='form' noValidate onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='firstName'
            label={t('firstName')}
            name='firstName'
            autoComplete='firstName'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='lastName'
            label={t('LastName')}
            name='lastName'
            autoComplete='lastName'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label={t('userName')}
            name='username'
            autoComplete='username'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            type='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='Password'
            type='password'
            label={t('Password')}
            name='password'
            autoComplete='Password'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='passwordConform'
            type='password'
            label={t('ConformPassword')}
            name='passwordConform'
            autoComplete='passwordConform'
          />
          <FormControlLabel label={t('AcceptTerms')} control={<Checkbox value='terms' color='primary' />} />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
            {t('SignUp')}
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                {t('AlreadyHaveAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
