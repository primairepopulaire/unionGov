import {
  createSlice
} from '@reduxjs/toolkit';
import { fetchAllPositions } from '../effects';
import { positionsAdapter } from '../state';

const positionsSlice = createSlice({
  name: 'positions',
  initialState: positionsAdapter.getInitialState({}),
  reducers: {
    upsertMany: positionsAdapter.upsertMany
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPositions.fulfilled, (state, action) => {
      action.payload && positionsAdapter.upsertMany(state, action.payload);
    });
  }
});

export default positionsSlice
