import { shallowEqual } from 'react-redux';
import { governmentSelector } from '../redux/Government/selectors';
import { allPositionIdsSelector } from '../redux/Positions/selectors';
import { useAppSelector } from './redux';

/** Figures out from store data if user has chosen a candidate for every position in the to-be government */
const useMissingGovernmentPositionCount = (): undefined | number => {
  const positionIds = useAppSelector(allPositionIdsSelector, shallowEqual);
  const government = useAppSelector(governmentSelector, shallowEqual);

  // can't be computed if we don't even have available positions to start with
  if (!positionIds?.length) return;

  return positionIds.filter((positionId) => !government[positionId]).length;
};

export default useMissingGovernmentPositionCount;
