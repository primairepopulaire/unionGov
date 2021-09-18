import { FunctionComponent, useMemo } from 'react';
import Component, { ItemProps } from '../components/Candidates';
import { Candidate } from '../redux/Candidates/state';

export type Props = {
  candidates?: Candidate[]
}

const mapper = ({ imageUrl, firstName, lastName }: Candidate): ItemProps => ({
  label: `${firstName} ${lastName}`,
  imageUrl
})

/**
 * Candidates container
 * Mapps redux data to UI eatable data
 */
const Candidates: FunctionComponent<Props> = ({ candidates }) => {
  const items = useMemo(() => candidates && candidates.map(mapper), [candidates]);

  return <Component candidates={items} />;
};

export default Candidates;
