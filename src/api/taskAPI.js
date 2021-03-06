import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './newAPI';

export const loginUser = createAsyncThunk('user/signin', async (credentials) => {
  try {
    const res = await axios.post('/auth/signin', credentials);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchAllData = createAsyncThunk('user/signup', async (allData) => {
  axios
    .post('/auth/signup', {
      firstName: allData.firstName,
      lastName: allData.lastName,
      email: allData.email,
      password: allData.password,
      username: allData.username,
    })
    .then(function (response) {
      if (response.data === 'USER_CREATED' && response.status === 201) {
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
export const fetchDeleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  try {
    await axios.delete(`/tasks/${id}`);
  } catch (error) {
    throw Error(error);
  }
});

export const fetchGetAllTasks = createAsyncThunk('tasks/getTasks', async (_thunkAPI) => {
  try {
    const response = await axios.get(`/tasks`);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchCreateTask = createAsyncThunk('tasks/createTask', async (params) => {
  const { title, description, status } = params;

  const bodyParameters = {
    title,
    description,
    status,
  };
  try {
    const response = await axios.post(`/tasks`, bodyParameters);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});
