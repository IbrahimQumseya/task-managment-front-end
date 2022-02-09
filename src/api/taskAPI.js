import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./newAPI";
export const fetchDeleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => {
    try {
      console.log(id);
      const result = await axios.delete(`/tasks/${id}`);
      if (result.status === "404") {
        console.log("eroor delete");
      }
    } catch (error) {}
  }
);

export const fetchGetAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`/tasks`);
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
      const response = await axios.post(`/tasks`, bodyParameters);
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
