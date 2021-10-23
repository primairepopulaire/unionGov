import { FunctionComponent, useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/Government';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAllCandidates } from '../redux/Candidates/effects';
import { fetchAllPositions } from '../redux/Positions/effects';
import { allPositionIdsSelector } from '../redux/Positions/selectors';
import { EmptyRecord } from '../types';
import { fetchNewConfigRef } from '../redux/Config/effects';

/** Government screen entry */
const Government: FunctionComponent<EmptyRecord> = () => {
  const positionIds = useAppSelector(allPositionIdsSelector, shallowEqual);
  const dispatch = useAppDispatch();
  const items = useMemo(
    () => positionIds.map((positionId) => ({ positionId })),
    [positionIds]
  );

  // <=> componentDidMount
  useEffect(() => {
    dispatch(fetchAllPositions());
    dispatch(fetchAllCandidates());
    dispatch(fetchNewConfigRef())
    // cleanup function called when component is unmounted
    return () => undefined;
  }, [])

  return <Component items={items} />;
};

export default Government;
