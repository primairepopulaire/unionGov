import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { allCandidatesSelector } from '../redux/Candidates/selectors';
import { governmentSelector } from '../redux/Government/selectors';
import { useAppSelector } from './redux';

type Candidates = ReturnType<typeof allCandidatesSelector>;
type TaggedCandidate = Candidates[0] & {
  /** wether or not a candidate is available for the picking (ie: not already picked out) */
  isAvailable: boolean;
}
type Gov = ReturnType<typeof governmentSelector>;

const mapper = (candidates: Candidates, userGov: Gov): TaggedCandidate[] => {
  const govCandidateIds = Object.values(userGov);

  return candidates.map(can => ({
    ...can,
    isAvailable: !govCandidateIds.includes(can.id)
  }));
}

/** FIgures out from store data which set of candidate is available for the picking */
const useAvailableCandidates = () => {
  const candidates = useAppSelector(allCandidatesSelector, shallowEqual);
  const userGov = useAppSelector(governmentSelector, shallowEqual);

  const taggedCandidates = useMemo(
    () => mapper(candidates, userGov),
    [candidates, userGov]
  );

  return taggedCandidates;
}

export default useAvailableCandidates;
