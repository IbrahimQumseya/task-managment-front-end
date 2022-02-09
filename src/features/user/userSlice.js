import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  username: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isAuthenticated: false,
  isExpiredToken: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      //   state.username = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("user", action.payload);
    },
    logout: (state, action) => {
      //   state.username = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
