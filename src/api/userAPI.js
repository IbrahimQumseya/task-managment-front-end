import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './newAPI';

export const fetchGetUserDetails = createAsyncThunk('user/getUserDetails', async () => {
  try {
    const res = await axios.get(`/user-details/getUserDetails`);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
});

export const updateUserDetails = createAsyncThunk('user/updateDetails', async (userDetailsDto) => {
  try {
    const res = await axios.patch(`users/user/updateUser`, userDetailsDto);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
});

export const createUserDetails = createAsyncThunk('user/createUserDetails', async (userId, userCreateDetailsDto) => {
  try {
    const res = await axios.post(`/user-details/create-details/user/${userId}`, userCreateDetailsDto);
    const { location, address, number, firstname, telephone, lastName } = res.data;
    return { location, address, number, firstname, telephone, lastName };
  } catch (error) {
    throw Error(error);
  }
});
