import { Typography } from '@material-ui/core';
import { FunctionComponent, memo } from 'react';

export type Props = {
  imageUrl: string;
  label: string;
};

/** Displays a candidate list item */
const CandidateItem: FunctionComponent<Props> = memo(({ imageUrl, label }) => (
  <li className="flex-fill list-group-item d-flex justify-content-between align-items-center">
    <Typography className="col-10">{label}</Typography>
    <img className="col-2" src={imageUrl} alt={label} />
  </li>
));
CandidateItem.displayName = 'CandidateItem';

export default CandidateItem;
