import { FunctionComponent, useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/Government';
import { useAppSelector } from '../hooks/redux';
import { fetchAllCandidates } from '../redux/Candidates/effects';
import { fetchAllPositions } from '../redux/Positions/effects';
import { allPositionIdsSelector } from '../redux/Positions/selectors';
import { EmptyRecord } from '../types';

/** Government screen entry */
const Government: FunctionComponent<EmptyRecord> = () => {
  const positionIds = useAppSelector(allPositionIdsSelector, shallowEqual);

  const items = useMemo(
    () => positionIds.map((positionId) => ({ positionId })),
    [positionIds]
  );

  // <=> componentDidMount
  useEffect(() => {
    fetchAllPositions();
    fetchAllCandidates();
    // cleanup function called when component is unmounted
    return () => undefined;
  }, [])

  return <Component items={items} />;
};

export default Government;
