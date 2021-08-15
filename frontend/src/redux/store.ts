import { configureStore } from '@reduxjs/toolkit'
import candidatesSlice from './Candidates'
import positionsSlice from './Positions'

export const store = configureStore({
  reducer: {
    candidates: candidatesSlice.reducer,
    positions: positionsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
