import {
  createSlice
} from '@reduxjs/toolkit'
import { } from './effects'
import { candidatesAdapter, initialCandidatesState } from './state'

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: initialCandidatesState(),
  reducers: {
    upsertMany: candidatesAdapter.upsertMany
  }
})

export default candidatesSlice
