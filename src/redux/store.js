import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import dialogSlice from '../features/dialog/dialogSlice';
import tasksSlice from '../features/tasks/tasksSlice';
import userSlice from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    tasks: tasksSlice,
    dialog: dialogSlice,
  },
});
