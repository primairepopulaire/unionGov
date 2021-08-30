import {
  createSlice
} from '@reduxjs/toolkit'
import { positionsAdapter } from '../state'

const positionsSlice = createSlice({
  name: 'positions',
  initialState: positionsAdapter.getInitialState({}),
  reducers: {
    upsertMany: positionsAdapter.upsertMany
  }
})

export default positionsSlice
