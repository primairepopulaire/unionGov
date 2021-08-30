import { shallowEqual } from 'react-redux';
import { candidateSelector } from '../redux/Candidates/selectors';
import { governmentCandidateSelector } from '../redux/Government/selectors';
import { Position } from '../redux/Positions/state';
import { useAppSelector } from './redux';

/** FIgures out from store data which candidate is assigned to a particular position */
const usePositionCandidate = (positionId: Position['id']) => {
  const candidateId = useAppSelector(
    governmentCandidateSelector(positionId),
    shallowEqual
  );
  return useAppSelector(
    candidateSelector(candidateId || ''),
    shallowEqual
  );
};

export default usePositionCandidate;
