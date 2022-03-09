import { createSlice } from '@reduxjs/toolkit';
import { createUserDetails, fetchGetUserDetails, updateUserDetails } from '../../api/userAPI';

const initialState = {
  users: [],
  userDetails: {},
  username: '',
  email: '',
  isFulfilled: false,
  isPending: false,
  isRejected: false,
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
  extraReducers(builder) {
    builder
      .addCase(fetchGetUserDetails.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(fetchGetUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(fetchGetUserDetails.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })
      .addCase(updateUserDetails.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(updateUserDetails.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      })
      .addCase(createUserDetails.pending, (state, _action) => {
        state.isPending = true;
      })
      .addCase(createUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isFulfilled = true;
        state.isPending = false;
      })
      .addCase(createUserDetails.rejected, (state, _action) => {
        state.isRejected = true;
        state.isFulfilled = false;
        state.isPending = false;
      });
  },
});

export const { login, logout } = userSlice.actions;
export const selectUserDetails = (state) => state.user.userDetails;
export default userSlice.reducer;
