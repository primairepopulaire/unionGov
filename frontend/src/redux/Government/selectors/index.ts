import { createSelector } from '@reduxjs/toolkit'
import { Position } from '../../Positions/state'
import { RootState } from '../../store'

const stateSelector = (state: RootState): RootState['government'] => state.government

/** Selects current government in store */
export const governmentSelector = createSelector(stateSelector, state => state)

/** Selects current government candidate for the given positionId in store */
export const governmentCandidateSelector = (positionId: Position['id']) => createSelector(stateSelector, state => {
  if (state && state[positionId]) return state[positionId];
  return undefined;
})
