import axios from '../api/newAPI';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';

const GoogleAuth = () => {
  const [user, setUser] = useState();
  const google = async () => {
    const data = await axios.get('/auth/google');
    console.log(data);
    window.open('http://localhost:8081/home', '_self');
  };
  // const onSuccess = async (res) => {
  //   try {
  //     const result = await axios.post('/auth/google/', {
  //       token: res,
  //     });

  //     setUser(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      {/* <GoogleLogin clientId={`${process.env.GOOGLE_CLIENT_ID}`} onSuccess={onSuccess} /> */}
      <Button onClick={google} size='large'>
        SIGNITTT
      </Button>
    </div>
  );
};

export default GoogleAuth;
