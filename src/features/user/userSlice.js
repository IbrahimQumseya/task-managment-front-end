import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      //   state.username = action.payload;
      state.isAuthenticated = true;
      //   localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      //   state.username = action.payload;
      state.isAuthenticated = false;
      //   localStorage.removeItem("user");
    },
  },
  extraReducers: {},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
