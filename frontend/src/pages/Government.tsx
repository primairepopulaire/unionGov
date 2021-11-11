import { FunctionComponent, useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/Government';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchAllCandidates } from '../redux/Candidates/effects';
import { fetchAllPositions } from '../redux/Positions/effects';
import { allPositionIdsSelector } from '../redux/Positions/selectors';
import { EmptyRecord } from '../types';
import { fetchNewConfigRef } from '../redux/Config/effects';
import {
  useParams
} from 'react-router-dom';
import { fetchGovernmentById } from '../redux/Government/effects';
import { setCandidateAction } from '../redux/Government/reducer';
import { GovernmentState } from '../redux/Government/state';

/** Government screen entry */
const Government: FunctionComponent<EmptyRecord> = () => {
  const positionIds = useAppSelector(allPositionIdsSelector, shallowEqual);
  const dispatch = useAppDispatch();
  const params: { id?: string} = useParams();

  const items = useMemo(
    () => positionIds.map((positionId) => ({ positionId })),
    [positionIds]
  );

  // <=> componentDidMount
  useEffect(() => {
    dispatch(fetchAllPositions());
    dispatch(fetchAllCandidates());
    dispatch(fetchNewConfigRef())
    if (params?.id) {
      const numberId = Number(params?.id)
      dispatch(fetchGovernmentById(numberId)).then((res: any) => {
        const newGovernement: GovernmentState = res?.payload
        if (newGovernement) {
          Object.entries(newGovernement).forEach(([position, candidate]) => {
            dispatch(setCandidateAction({ candidateId: candidate, positionId: position }));
          })
        }
      })
    }
    // cleanup function called when component is unmounted
    return () => undefined;
  }, [])

  return <Component items={items} />;
};

export default Government;
