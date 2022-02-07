import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks`, {
        headers: { Authorization: "Bearer " + token },
      });
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCreateTask = createAsyncThunk(
  "tasks/createTask",
  async (params) => {
    const { title, description,status,token } = params;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      title,
      description,
      status,
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/tasks`,
        bodyParameters,
        config
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
