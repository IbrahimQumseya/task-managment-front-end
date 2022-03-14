import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './newAPI';

export const fetchGetMetadataById = createAsyncThunk('metadata/getMetadataById', async (id, _thunkAPI) => {
  try {
    const res = await axios.get(`/task-metadata/${id}/details`);
    return res.data;
  } catch (error) {
    throw Error(error);
  }
});
