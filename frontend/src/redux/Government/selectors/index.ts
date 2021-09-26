import { createSelector } from '@reduxjs/toolkit';
import { Position } from '../../Positions/state';
import { RootState } from '../../store';

const stateSelector = (state: RootState): RootState['government'] => state.government

/** Selects current government in store */
export const governmentSelector = createSelector(stateSelector, state => state.couples);

/** Selects current government sharing key in store */
export const governmentShareRefSelector = createSelector(stateSelector, state => state.shareRef);

/** Selects current government candidate for the given positionId in store */
export const governmentCandidateSelector = (positionId: Position['id']) => createSelector(stateSelector, state => {
  if (state && state.couples[positionId]) return state.couples[positionId]?.candidateId;
  return undefined;
})

/** Know whether or not the current governement is in the process of being saved */
export const isSavingGovernmentSelector = createSelector(stateSelector, state => !!state?.isSaving);
