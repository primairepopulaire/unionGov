import { Typography } from '@material-ui/core';
import { FunctionComponent, memo } from 'react';
import CandidateSelect, { Props as SelectProps } from '../../containers/SelectCandidate';

export type Props = {
  /** The associated candidate uri */
  imageUrl?: string;
  positionName: string;
} & SelectProps;

const MISTERY_CANDIDATE = 'https://www.parrainages-primairepopulaire.fr/file/primaire_candidat_mystere.png'

const GovernmentItem: FunctionComponent<Props> = memo(
  ({ imageUrl, positionName, ...props }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="col-10">
        <Typography color={imageUrl ? 'primary' : undefined}>{positionName}</Typography>
        <CandidateSelect {...props} />
      </div>
      <img
        className="col-2"
        src={imageUrl || MISTERY_CANDIDATE}
        alt={positionName}
      />
    </li>
  )
);
GovernmentItem.displayName = 'GovernmentItem';

export default GovernmentItem;
