import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

type Position = {
  id: string;
  name: string;
};

const positionsAdapter = createEntityAdapter<Position>({
  // Assume IDs are stored in a field other than `book.id,
  selectId: (position) => position.id
})

const positionsSlice = createSlice({
  name: 'positions',
  initialState: positionsAdapter.getInitialState({}),
  reducers: {
    upsertMany: positionsAdapter.upsertMany
  }
})

export default positionsSlice
