import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  username: '',
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  isExpiredToken: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      sessionStorage.setItem('user', action.payload);
    },
    logout: (state, _action) => {
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');
    },
    setIsAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: {},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
