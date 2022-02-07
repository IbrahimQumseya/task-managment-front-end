import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateTask, fetchGetAllTasks } from "../../api/taskAPI";
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
    addTaskStatePost: (state, action) => {
      // console.log(action);
      // state.tasks.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchGetAllTasks.fulfilled, (state, action) => {
      state.tasks = state.tasks.concat(action.payload);
      state.isPushed = "true";
    }).addCase(fetchCreateTask.fulfilled, (state,action) => {
      state.tasks.push(action.payload);
    })
  },
});

export const { addTaskStatePost } = tasksSlice.actions;
export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;
