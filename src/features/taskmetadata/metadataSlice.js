import { createSlice } from '@reduxjs/toolkit';
import { fetchGetMetadataById } from '../../api/metadataAPI';
const initialState = {
  metadata: [],
  isFulfilled: false,
  isPending: false,
  isRejected: false,
};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetMetadataById.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(fetchGetMetadataById.fulfilled, (state, action) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.metadata = action.payload;
      })
      .addCase(fetchGetMetadataById.rejected, (state, action) => {
        state.isFulfilled = false;
        state.isRejected = true;
        state.isPending = false;
      });
  },
});

export const selectMetadata = (state) => state.metadata.metadata;
export default metadataSlice.reducer;
