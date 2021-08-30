import { FunctionComponent, memo } from 'react';

export type Props = {
  imageUrl: string;
  label: string;
};

/** Displays a candidate list item */
const CandidateItem: FunctionComponent<Props> = memo(({ imageUrl, label }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{label}</span>
      <img className="candidatePicture" src={imageUrl} alt={label} />
    </li>
));
CandidateItem.displayName = 'CandidateItem';

export default CandidateItem;
