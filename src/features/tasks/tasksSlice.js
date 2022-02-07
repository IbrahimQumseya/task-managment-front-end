import { createSlice } from "@reduxjs/toolkit";
import { fetchGetAllTasks } from "../../api/taskAPI";
const initialState = {
  tasks: [],
  loading:'idle',
  isError :'false',
  isLoading:'false'
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGetAllTasks.fulfilled, (state, action) => {
      state.tasks = state.tasks.concat(action.payload);
    });
  },
});

// export const {} tasksSlice.actions
export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;
