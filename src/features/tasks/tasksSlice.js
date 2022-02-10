import { createSlice } from '@reduxjs/toolkit';
import { fetchCreateTask, fetchGetAllTasks, fetchDeleteTask } from '../../api/taskAPI';
const initialState = {
  tasks: [],
  isFulfilled: false,
  isPending: false,
  isRejected: false,
  isPushed: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetAllTasks.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(fetchGetAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(fetchGetAllTasks.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })
      .addCase(fetchCreateTask.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(fetchCreateTask.rejected, (state, _action) => {
        state.isFulfilled = false;
        state.isPending = false;
        state.isRejected = true;
      })
      .addCase(fetchDeleteTask.pending, (state, { meta }) => {
        state.isPending = true;
      })
      .addCase(fetchDeleteTask.fulfilled, (state, { meta }) => {
        state.tasks = state.tasks.filter((task) => task.id !== meta.arg);
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(fetchDeleteTask.rejected, (state, { meta }) => {
        state.tasks = state.tasks.filter((task) => task.id !== meta.arg);
        state.isFulfilled = false;
        state.isPending = false;
        state.isRejected = true;
      });
  },
});

export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;
