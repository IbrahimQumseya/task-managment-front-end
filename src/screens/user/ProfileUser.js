import { Avatar, Button, Container, CssBaseline, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUserDetails, updateUserDetails } from '../../api/userAPI';

import { selectUser, setUserFirstnameLastname } from '../../features/user/userSlice';
import SignIn from '../SignIn';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useTranslation } from 'react-i18next';
import BasicAlerts from '../../components/BasicAlerts';

const ProfileUser = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [location, setLocation] = useState(userDetails.location);
  const [address, setAddress] = useState(userDetails.address);
  const [number, setNumber] = useState(userDetails.number);
  const [telephone, setTelephone] = useState(userDetails.telephone);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [idUser, setIdUser] = useState(user.id);
  const [message, setMessage] = useState('');
  const [enableEdit, setEnableEdit] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchGetUserDetails());
      if (message) {
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    }
  }, [isAuthenticated, dispatch, setMessage, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && address && number && telephone && firstName && lastName) {
      const bodyParameters = {
        firstName,
        lastName,
        location,
        address,
        number: String(number),
        telephone: String(number),
      };
      dispatch(updateUserDetails(bodyParameters));
      setEnableEdit(!enableEdit);
      setMessage('User has been updated cu success');
      dispatch(setUserFirstnameLastname({ firstName, lastName }));
    }
    // if (!userDetails.location && !userDetails.address && !userDetails.number && !userDetails.telephone) {
    //   console.log('00');
    //   const bodyParameters = {
    //     location,
    //     address,
    //     number: String(number),
    //     telephone: String(number),
    //   };
    //   console.log(bodyParameters);
    //   dispatch(createUserDetails(idUser, bodyParameters));
    // }
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };

  if (isAuthenticated) {
    return (
      <Container maxWidth='md' component='main'>
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
              id='firstName'
              type='firstName'
              disabled={enableEdit}
              label={t('firstName')}
              InputLabelProps={{
                shrink: true,
              }}
              value={firstName}
              onChange={handleChangeFirstName}
            />
            <TextField
              margin='normal'
              fullWidth
              id='lastName'
              type='lastName'
              disabled={enableEdit}
              label={t('lastName')}
              InputLabelProps={{
                shrink: true,
              }}
              value={lastName}
              onChange={handleChangeLastName}
            />
            <TextField
              margin='normal'
              fullWidth
              id='location'
              disabled={enableEdit}
              label={t('location')}
              InputLabelProps={{
                shrink: true,
              }}
              value={location}
              // value={location ? location : userDetails.location}
              onChange={handleChangeLocation}
            />

            <TextField
              margin='normal'
              fullWidth
              id='number'
              type='number'
              disabled={enableEdit}
              label={t('number')}
              InputLabelProps={{
                shrink: true,
              }}
              value={number}
              onChange={handleChangeNumber}
            />
            <TextField
              margin='normal'
              fullWidth
              id='telephone'
              type='number'
              disabled={enableEdit}
              InputLabelProps={{
                shrink: true,
              }}
              label={t('telephone')}
              value={telephone}
              onChange={handleChangeTelephone}
            />
            <TextField
              margin='normal'
              fullWidth
              id='address'
              label={t('address')}
              disabled={enableEdit}
              InputLabelProps={{
                shrink: true,
              }}
              value={address}
              onChange={handleChangeAddress}
            />
            {message && <BasicAlerts severity='success' message={message} />}
            <Grid container>
              <Button
                type='submit'
                onClick={handleSubmit}
                variant='contained'
                sx={{ mt: 3, mb: 2, height: 45 }}
                disabled={enableEdit}
              >
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
