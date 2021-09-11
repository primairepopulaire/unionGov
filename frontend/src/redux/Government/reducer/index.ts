import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiCandidate, ApiPosition } from '../../../types/api';
import { initialGovernmentState } from '../state';

type SetGovernmentCandidate = { candidateId?: ApiCandidate['id']; positionId: ApiPosition['id'] };

const governmentSlice = createSlice({
  name: 'government',
  initialState: initialGovernmentState(),
  reducers: {
    setCandidate: (state, { payload: { positionId, candidateId } }: PayloadAction<SetGovernmentCandidate>): void => {
      if (candidateId) {
        state[positionId] = candidateId;
      } else if (state[positionId]) {
        delete state[positionId];
      }
    }
  }
})

export const { setCandidate: setCandidateAction } = governmentSlice.actions;

export default governmentSlice
