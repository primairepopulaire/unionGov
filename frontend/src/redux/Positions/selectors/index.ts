import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Position, positionsAdapter } from '../state'

const stateSelector = (state: RootState): RootState['positions'] => state.positions

/** Selects all known positions in store */
export const allPositionsSelector = createSelector(stateSelector, (state) =>
  positionsAdapter.getSelectors().selectAll(state)
)

/** Selects all known position ids in store */
export const allPositionIdsSelector = createSelector(stateSelector, (state) =>
  (positionsAdapter.getSelectors().selectIds(state) as Position['id'][])
)

/** Selects a specific position in store */
export const positionSelector = (id: Position['id']) => createSelector(stateSelector, (state) =>
  positionsAdapter.getSelectors().selectById(state, id)
);
