import { FunctionComponent, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../containers/Candidates';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAllCandidates } from '../redux/Candidates/effects';
import { allCandidatesSelector } from '../redux/Candidates/selectors';
import { EmptyRecord } from '../types';

/** Candidates screen entry */
const Candidates: FunctionComponent<EmptyRecord> = () => {
  const candidates = useAppSelector(allCandidatesSelector, shallowEqual);
  const dispatch = useAppDispatch();
  // <=> componentDidMount
  useEffect(() => {
    dispatch(fetchAllCandidates());
    // cleanup function called when component is unmounted
    return () => undefined;
  }, []);

  return <Component candidates={candidates} />;
}

export default Candidates;
