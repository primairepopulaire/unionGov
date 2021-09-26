import { ApiGovernement } from '../../../types/api';
import { GovernmentState } from '../state';

export const mapApiGovernementToStateGov = (
  data: ApiGovernement
): GovernmentState => data.reduce((state, couple) => {
  if (couple.position.id && couple.candidate?.id) {
    state.couples[couple.position.id] = {
      candidateId: couple.candidate.id
    };
  }
  return state;
}, {} as GovernmentState)
