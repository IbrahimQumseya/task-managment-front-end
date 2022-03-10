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
import { Formik, useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAllData } from '../api/taskAPI';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(/[a-z]+/, 'One lowercase character')
    .matches(/[A-Z]+/, 'One uppercase character')
    .matches(/[@$!%*#?&]+/, 'One special character')
    .matches(/\d+/, 'One number'),
  firstName: yup
    .string('Enter your first name')
    .required('First name is required')
    .min(3, 'First name should be of minim 3 characters length')
    .max(20, 'First name should be of max 20 characters length'),
  lastName: yup
    .string('Enter your Last name')
    .required('Last name is required')
    .min(3, 'Last name should be of minim 3 characters length')
    .max(20, 'Last name should be of max 20 characters length'),
  username: yup
    .string('Enter your username name')
    .required('Username is required')
    .min(3, 'username name should be of minim 3 characters length')
    .max(20, 'username name should be of max 20 characters length'),
  passwordConform: yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
  }),
});

function SignUp() {
  const { t } = useTranslation();
  const history = useNavigate();

  const handleSubmit = (values) => {
    const { email, lastName, firstName, password, passwordConform, username } = values;

    const allData = {
      email,
      lastName,
      firstName,
      password,
      passwordConform,
      username,
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConform: '',
      firstName: '',
      lastName: '',
      username: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    
  });
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
        <Box sx={{ m1: 3 }} component='form' noValidate onSubmit={formik.handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='firstName'
            label={t('firstName')}
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
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
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label={t('userName')}
            name='username'
            autoComplete='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            value={formik.values.passwordConform}
            onChange={formik.handleChange}
            error={formik.touched.passwordConform && Boolean(formik.errors.passwordConform)}
            helperText={formik.touched.passwordConform && formik.errors.passwordConform}
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
