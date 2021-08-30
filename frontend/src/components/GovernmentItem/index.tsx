import { FunctionComponent, memo } from 'react';
import CandidateSelect, { Props as SelectProps } from '../../containers/SelectCandidate';
import '../Candidates/index.css';

export type Props = {
  /** The associated candidate uri */
  imageUrl?: string;
  positionName: string;
} & SelectProps;

const MISTERY_CANDIDATE = 'https://www.parrainages-primairepopulaire.fr/file/primaire_candidat_mystere.png'

const GovernmentItem: FunctionComponent<Props> = memo(({
  imageUrl = MISTERY_CANDIDATE,
  positionName,
  ...props
}) => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    <span>
      <span className="positionName">{positionName}</span>
      <CandidateSelect {...props} />
    </span>
    <img className="candidatePicture" src={imageUrl} alt={positionName} />
  </li>
));
GovernmentItem.displayName = 'GovernmentItem';

export default GovernmentItem;
