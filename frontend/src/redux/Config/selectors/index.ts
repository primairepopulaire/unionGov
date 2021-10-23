import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const stateSelector = (state: RootState): RootState['config'] => state.config

/** Selects current config in store */
export const configSelector = createSelector(stateSelector, state => state)
