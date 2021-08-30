import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Candidate, candidatesAdapter } from '../state'

const stateSelector = (state: RootState): RootState['candidates'] => state.candidates

/** Selects all known candidates in store */
export const allCandidatesSelector = createSelector(stateSelector, (state) =>
  candidatesAdapter.getSelectors().selectAll(state)
)

/** Selects a specific candidate in store */
export const candidateSelector = (id: Candidate['id']) =>
  createSelector(stateSelector, (state) =>
    candidatesAdapter.getSelectors().selectById(state, id)
  );
