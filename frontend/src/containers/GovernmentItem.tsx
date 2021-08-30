import { FunctionComponent } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Component from '../components/GovernmentItem';
import usePositionCandidate from '../hooks/use-position-candidate';
import { positionSelector } from '../redux/Positions/selectors';
import { Position } from '../redux/Positions/state';

export type Props = {
  positionId: Position['id']
}

const DEFAULT_POSITION_NAME = 'chargement..';

const GovernmentItem: FunctionComponent<Props> = ({ positionId, ...props }) => {
  const position = useSelector(positionSelector(positionId), shallowEqual);
  const candidate = usePositionCandidate(positionId);

  return (
    <Component
      positionId={positionId}
      imageUrl={candidate?.imageUrl}
      positionName={position?.name || DEFAULT_POSITION_NAME}
    />
  );
};

export default GovernmentItem;
