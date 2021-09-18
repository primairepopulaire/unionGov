import {
  createSlice
} from '@reduxjs/toolkit';
import { fetchAllCandidates } from '../effects';
import { candidatesAdapter, initialCandidatesState } from '../state';

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: initialCandidatesState(),
  reducers: {
    upsertMany: candidatesAdapter.upsertMany
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCandidates.fulfilled, (state, action) => {
      action.payload && candidatesAdapter.upsertMany(state, action.payload);
    });
  }
})

export default candidatesSlice
