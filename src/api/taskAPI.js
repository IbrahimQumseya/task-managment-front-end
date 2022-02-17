import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './newAPI';
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
