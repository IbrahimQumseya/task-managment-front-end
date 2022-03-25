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
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { fetchAllData } from '../api/taskAPI';
import { useTranslation } from 'react-i18next';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  acceptTerms: yup
    .boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
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
  const history = useNavigate();
  const { t } = useTranslation();
  const [buttonEnable, setButtonEnable] = useState(true);

  const handleSubmit = (values) => {
    const { email, lastName, firstName, password, passwordConform, username } = values;

    if (email && firstName && lastName && password && passwordConform && username) {
      if (password === passwordConform) {
        // here we work to fetch data POST
        try {
          fetchAllData(values);
          history('/login');
        } catch (error) {
          throw new Error(error);
        }
      } else {
        alert('password and conform password doesnt match');
      }
    } else {
      alert('you should fill every field ');
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
      acceptTerms: false,
    },
    initialErrors: {
      email: 'Enter your email',
      password: 'Enter your password',
      passwordConform: 'Both password need to be the same',
      firstName: 'Enter your first name',
      lastName: 'Enter your Last name',
      username: 'Enter your username name',
      acceptTerms: 'The terms and conditions must be accepted.',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  useEffect(() => {
    setButtonEnable(
      !formik.errors.acceptTerms &&
        !formik.errors.acceptTerms &&
        !formik.errors.email &&
        !formik.errors.firstName &&
        !formik.errors.lastName &&
        !formik.errors.password &&
        !formik.errors.passwordConform &&
        !formik.errors.username
        ? false
        : true
    );
  }, [
    formik.errors.acceptTerms,
    formik.errors.email,
    formik.errors.firstName,
    formik.errors.lastName,
    formik.errors.password,
    formik.errors.passwordConform,
    formik.errors.username,
  ]);
  return (
    <Container component='main' maxWidth='xs'>
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
          Sigh Up
        </Typography>
        <Box sx={{ m1: 3 }} component='form' noValidate onSubmit={formik.handleSubmit}>
          <TextField
            margin='normal'
            required={true}
            fullWidth
            inputProps={{ 'data-testid': 'required-firstName' }}
            id='firstName'
            label='First Name'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName}
            autoComplete='firstName'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            inputProps={{ 'data-testid': 'required-lastName' }}
            id='lastName'
            label='Last Name'
            name='lastName'
            autoComplete='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.errors.lastName}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            inputProps={{ 'data-testid': 'required-username' }}
            label='User Name'
            name='username'
            autoComplete='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.errors.username && Boolean(formik.errors.username)}
            helperText={formik.errors.username}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            type='email'
            label='Email Address'
            inputProps={{ 'data-testid': 'required-email' }}
            name='email'
            autoComplete='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='Password'
            type='password'
            inputProps={{ 'data-testid': 'required-password' }}
            label='Password'
            name='password'
            autoComplete='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='passwordConform'
            type='password'
            inputProps={{ 'data-testid': 'required-passwordConform' }}
            label='Conform Password'
            name='passwordConform'
            autoComplete='passwordConform'
            value={formik.values.passwordConform}
            onChange={formik.handleChange}
            error={formik.errors.passwordConform && Boolean(formik.errors.passwordConform)}
            helperText={formik.errors.passwordConform}
          />
          {/* <FormControlLabel label='i accept the terms' control={<Checkbox value='terms' color='primary' />} /> */}
          {/* <Form>
            <Field
              type='acceptTerms'
              name='acceptTerms'
              component={CheckBoxComponent}
            
            />
          </Form> */}
          <FormControlLabel
            label={t('AcceptTerms')}
            control={
              <Checkbox
                inputProps={{ 'data-testid': 'required-acceptTerms' }}
                value={formik.values.acceptTerms}
                color='primary'
                checked={formik.values.acceptTerms}
                onChange={() => {
                  formik.setFieldValue('acceptTerms', !formik.values.acceptTerms);
                }}
              />
            }
          />
          {formik.errors.acceptTerms && formik.errors.acceptTerms && (
            <div style={{ color: 'red' }}>{formik.errors.acceptTerms}</div>
          )}

          <Button
            data-testid='signUpButton'
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
            disabled={buttonEnable}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
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
