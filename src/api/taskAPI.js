import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (token, thunkAPI) => {
    const response = await axios.get(`http://localhost:3000/tasks`, {
      headers: { Authorization: "Bearer " + token },
    });
    return await response.data;
  }
);
