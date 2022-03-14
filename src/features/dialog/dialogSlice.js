import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  content: [],
  handleYesButton: {},
  isFulfilled: false,
  isPending: false,
  isRejected: false,
  isOpen: false,
  description: '',
};

const dialogSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers: {},
});

export const selectDialog = (state) => state;
export const { openDialog, setIsOpen } = dialogSlice.actions;

export default dialogSlice.reducer;
