import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from './newAPI';
;


export const fetchGetAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async ( thunkAPI) => {
    try {
      // const response = await axios.get(`${REACT_APP_API_URL_TASK}/tasks`, {
      //   headers: { Authorization: "Bearer " + token },
      // });
      const response = await axios.get(`/tasks`)
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCreateTask = createAsyncThunk(
  "tasks/createTask",
  async (params) => {
    const { title, description, status } = params;

    const bodyParameters = {
      title,
      description,
      status,
    };
    try {
      const response = await axios.post(
        `/tasks`,
        bodyParameters,
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
