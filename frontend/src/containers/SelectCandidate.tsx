import { FunctionComponent, useCallback, useMemo } from 'react';
import Component, { Props as ComponentProps } from '../components/CandidateSelect';
import { useAppDispatch } from '../hooks/redux';
import useAvailableCandidates from '../hooks/use-available-candidates';
import usePositionCandidate from '../hooks/use-position-candidate';
import { Candidate } from '../redux/Candidates/state';
import { setCandidateAction } from '../redux/Government/reducer';
import { Position } from '../redux/Positions/state';

export type Props = Omit<ComponentProps, 'options' | 'current' | 'onChange'> & {
  positionId: Position['id'];
};

const mapCandidateToOption = ({ id, firstName, lastName }: Candidate): NonNullable<ComponentProps['options']>[0] => ({
  id,
  label: `${firstName} ${lastName}`,
  isDisabled: true
})

const mapCandidatesToOptions = (
  candidates: ReturnType<typeof useAvailableCandidates>
): ComponentProps['options'] =>
  candidates.map(({ isAvailable, ...candidate }) => ({
    ...mapCandidateToOption(candidate),
    isDisabled: !isAvailable
  }));

const CandidateSelect: FunctionComponent<Props> = ({ positionId, ...props }) => {
  const dispatch = useAppDispatch();
  const candidates = useAvailableCandidates();
  const candidate = usePositionCandidate(positionId);

  const options = useMemo(() => mapCandidatesToOptions(candidates), [candidates]);
  const current = useMemo(() => candidate && mapCandidateToOption(candidate), [candidate]);

  const handleChange = useCallback<ComponentProps['onChange']>((newCandidateId) => {
    dispatch(setCandidateAction({ candidateId: newCandidateId, positionId }));
  }, [positionId]);

  return (
    <Component
      current={current}
      options={options}
      onChange={handleChange}
      {...props}
    />
  );
};

export default CandidateSelect;
