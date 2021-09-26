import { shallowEqual } from 'react-redux';
import { governmentSelector } from '../redux/Government/selectors';
import { useAppSelector } from './redux';

/** Figures out from store data if user has chosen a candidate for at least one position in the to-be government */
const useHasOneCompleteCouple = (): boolean => {
  const government = useAppSelector(governmentSelector, shallowEqual);

  const configs = Object.values(government);

  if (!configs.length) return false;

  return configs.some(conf => !!conf?.candidateId);
};

export default useHasOneCompleteCouple;
