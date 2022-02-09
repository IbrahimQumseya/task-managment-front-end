import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateTask,
  fetchGetAllTasks,
  fetchDeleteTask,
} from "../../api/taskAPI";
import { v4 as uuid } from "uuid";
const initialState = {
  tasks: [],
  loading: "idle",
  isError: "false",
  isLoading: "false",
  isPushed: "false",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // deleteTask: (state, action) => {
    //   state.tasks.filter((task) => task.id === action.payload);
    //   console.log(state.tasks.find((task) => task.id === action.payload));
    // },
    addTaskStatePost: (state, action) => {
      // console.log(action);
      // state.tasks.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetAllTasks.fulfilled, (state, action) => {
        state.tasks = state.tasks.concat(action.payload);
        state.isPushed = "true";
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(fetchDeleteTask.fulfilled, (state, { meta }) => {
        state.tasks = state.tasks.filter((task) => task.id !== meta.arg);
      });
  },
});

export const { addTaskStatePost } = tasksSlice.actions;
export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;
