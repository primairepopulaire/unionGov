import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiCandidate, ApiPosition } from '../../../types/api';
import { GovernmentState, initialGovernmentState } from '../state';

type SetGovernmentCandidate = { candidateId?: ApiCandidate['id']; positionId: ApiPosition['id'] };
type SavingCouple = { candidateId: ApiCandidate['id']; positionId: ApiPosition['id'] };
type SavingCoupleError = { candidateId: ApiCandidate['id']; positionId: ApiPosition['id']; error: string };

const governmentSlice = createSlice({
  name: 'government',
  initialState: initialGovernmentState(),
  reducers: {
    setCandidate: (
      state,
      {
        payload: { positionId, candidateId }
      }: PayloadAction<SetGovernmentCandidate>
    ): void => {
      if (candidateId) {
        const oldCandidateId = state.couples[positionId]?.candidateId;
        if (oldCandidateId === candidateId) return;

        state.couples[positionId] = { candidateId };
      } else if (state.couples[positionId]) {
        delete state.couples[positionId];
      }
    },
    setShareRef: (
      state,
      { payload }: PayloadAction<GovernmentState['shareRef']>
    ) => {
      state.shareRef = payload;
    },
    loadingSavingCouple: (
      state,
      { payload: { positionId, candidateId } }: PayloadAction<SavingCouple>
    ): void => {
      const couple = state.couples[positionId];

      if (couple?.candidateId !== candidateId) return;

      state.couples[positionId] = {
        ...(couple || {}),
        isSaving: true,
        savingError: undefined
      };
    },
    successSavingCouple: (
      state,
      { payload: { positionId, candidateId } }: PayloadAction<SavingCouple>
    ): void => {
      const couple = state.couples[positionId];

      if (couple?.candidateId !== candidateId) return;

      state.couples[positionId] = {
        ...(couple || {}),
        savedAt: new Date().toISOString(),
        isSaving: false,
        savingError: undefined
      };
    },
    errorSavingCouple: (
      state,
      {
        payload: { positionId, candidateId, error }
      }: PayloadAction<SavingCoupleError>
    ): void => {
      const couple = state.couples[positionId];

      if (couple?.candidateId !== candidateId) return;

      state.couples[positionId] = {
        ...(couple || {}),
        isSaving: false,
        savingError: error
      };
    },
    loadingSaving: (state): void => {
      state.isSaving = true;
      state.savingError = undefined;
    },
    successSaving: (state): void => {
      state.isSaving = false;
    },
    errorSaving: (
      state,
      {
        payload
      }: PayloadAction<string>
    ): void => {
      state.isSaving = false;
      state.savingError = payload;
    }
  }
});

export const {
  setCandidate: setCandidateAction,
  loadingSaving: loadingSavingAction,
  successSaving: successSavingAction,
  errorSaving: errorSavingAction,
  loadingSavingCouple: loadingSavingCoupleAction,
  successSavingCouple: successSavingCoupleAction,
  errorSavingCouple: errorSavingCoupleAction,
  setShareRef: setShareRefAction
} = governmentSlice.actions;

export default governmentSlice
