import { configureStore } from '@reduxjs/toolkit'
import candidatesSlice from './Candidates/reducer'
import governmentSlice from './Government/reducer'
import positionsSlice from './Positions/reducer'

export const store = configureStore({
  reducer: {
    candidates: candidatesSlice.reducer,
    positions: positionsSlice.reducer,
    government: governmentSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
