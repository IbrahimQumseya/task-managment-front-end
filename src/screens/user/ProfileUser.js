import { Avatar, Button, Container, CssBaseline, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserDetails, fetchGetUserDetails, updateUserDetails } from '../../api/userAPI';
import Spinner from '../../components/Spinner';
import { selectUserDetails } from '../../features/user/userSlice';
import SignIn from '../SignIn';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useTranslation } from 'react-i18next';

const ProfileUser = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchGetUserDetails());
    }
  }, [isAuthenticated, dispatch]);

  const { t } = useTranslation();

  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [telephone, setTelephone] = useState('');
  const [enableEdit, setEnableEdit] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && address && number && telephone) {
      const bodyParameters = {
        firstName: 'testFirstname',
        lastName: 'testLastName',
        location,
        address,
        number: String(number),
        telephone: String(number),
      };
      console.log('distpatching');
      dispatch(updateUserDetails(bodyParameters));
    }
    // if (!userDetails.location && !userDetails.address && !userDetails.number && !userDetails.telephone) {
    //   const bodyParameters = {
    //     location,
    //     address,
    //     number: String(number),
    //     telephone: String(number),
    //   };
    //   console.log(bodyParameters);
    //   dispatch(createUserDetails(tasks[0]?.user?.id, bodyParameters));
    // }
  };

  const handleChangeLocation = (e) => {
    if (location === '') {
      setLocation(userDetails.location);
    }
    setLocation(e.target.value);
  };
  const handleChangeAddress = (e) => {
    if (address === '') {
      setAddress(userDetails.address);
    }
    setAddress(e.target.value);
  };
  const handleChangeNumber = (e) => {
    if (number === '') {
      setNumber(userDetails.number);
    }
    setNumber(e.target.value);
  };
  const handleChangeTelephone = (e) => {
    if (telephone === '') {
      setTelephone(userDetails.telephone);
    }
    setTelephone(e.target.value);
  };

  if (isAuthenticated) {
    return (
      <Container maxWidth='lg' component='main'>
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
            <img
              src='C:/Ibrahim/Vallerry/Reat/authenticationreact/images/img.jpg'
              srcSet={'../images/img.jpg'}
              alt={'../images/img.jpg'}
              loading='lazy'
            />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {t('UserDetails')}
          </Typography>
          <Box
            sx={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'right',
              alignSelf: 'flex-end',
              marginRight: 5,
            }}
          >
            <IconButton
              type='submit'
              onClick={() => setEnableEdit(!enableEdit)}
              sx={{ mt: 3, mb: 2, height: 45, width: 50 }}
            >
              <ModeEditIcon />
            </IconButton>
          </Box>

          <Box sx={{ m1: 2 }} component='form' noValidate>
            <TextField
              margin='normal'
              fullWidth
              id='location'
              disabled={enableEdit}
              label={t('location')}
              value={location ? location : userDetails.location}
              onChange={handleChangeLocation}
            />
            <TextField
              margin='normal'
              fullWidth
              id='number'
              type='number'
              disabled={enableEdit}
              label={t('number')}
              value={number ? number : userDetails.number}
              onChange={handleChangeNumber}
            />
            <TextField
              margin='normal'
              fullWidth
              id='telephone'
              type='number'
              disabled={enableEdit}
              label={t('telephone')}
              value={telephone ? telephone : userDetails.telephone}
              onChange={handleChangeTelephone}
            />
            <TextField
              margin='normal'
              fullWidth
              id='address'
              label={t('address')}
              disabled={enableEdit}
              value={address ? address : userDetails.address}
              onChange={handleChangeAddress}
            />
            <Grid container>
              <Button type='submit' onClick={handleSubmit} variant='contained' sx={{ mt: 3, mb: 2, height: 45 }}>
                {t('SubmitChanges')}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  return <SignIn />;
};

export default ProfileUser;
