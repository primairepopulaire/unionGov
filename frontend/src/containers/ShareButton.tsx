import { FunctionComponent, useCallback } from 'react';
import Component from '../components/ShareButton';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useHasOneCompleteCouple from '../hooks/use-has-one-complete-couple';
import useMissingGovernmentPositionCount from '../hooks/use-missing-government-position-count';
import { shareGovernment } from '../redux/Government/effects';
import { isSavingGovernmentSelector } from '../redux/Government/selectors';
import { EmptyRecord } from '../types';

export type Props = EmptyRecord;

/**
 * ShareButton container
 * Handles what to trigger when the optionnaly displayed Button is clicked on
 */
const ShareButton: FunctionComponent<Props> = () => {
  const dispatch = useAppDispatch();
  const missingCount = useMissingGovernmentPositionCount();
  const hasAtLeastOneCandidateSelected = useHasOneCompleteCouple();

  const isSaving = useAppSelector(isSavingGovernmentSelector);

  const handleShare = useCallback(() => {
    dispatch(shareGovernment());
  }, [dispatch]);

  return (
    <Component
      isDisabled={isSaving || !hasAtLeastOneCandidateSelected}
      missingPositionCount={missingCount}
      onShare={handleShare}
    />
  );
};

export default ShareButton;
