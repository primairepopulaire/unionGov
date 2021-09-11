import { FunctionComponent, useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Component from '../components/GovernmentItem';
import { useAppDispatch } from '../hooks/redux';
import usePositionCandidate from '../hooks/use-position-candidate';
import { setCandidateAction } from '../redux/Government/reducer';
import { positionSelector } from '../redux/Positions/selectors';
import { Position } from '../redux/Positions/state';

export type Props = {
  positionId: Position['id']
}

const DEFAULT_POSITION_NAME = 'chargement..';

const GovernmentItem: FunctionComponent<Props> = ({ positionId, ...props }) => {
  const dispatch = useAppDispatch();
  const position = useSelector(positionSelector(positionId), shallowEqual);
  const candidate = usePositionCandidate(positionId);

  const handleReset = useCallback(() => {
    dispatch(setCandidateAction({ positionId }));
  }, [dispatch, positionId]);

  return (
    <Component
      positionId={positionId}
      imageUrl={candidate?.imageUrl}
      positionName={position?.name || DEFAULT_POSITION_NAME}
      onReset={handleReset}
    />
  );
};

export default GovernmentItem;
