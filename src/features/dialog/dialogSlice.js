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
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
  extraReducers: {},
});

export const selectDialog = (state) => state;
export const { setIsOpen, setContent, setDescription, setTitle } = dialogSlice.actions;

export default dialogSlice.reducer;
