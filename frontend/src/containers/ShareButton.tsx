import { FunctionComponent, useCallback } from 'react';
import Component from '../components/ShareButton';
import useMissingGovernmentPositionCount from '../hooks/use-missing-government-position-count';
import { EmptyRecord } from '../types';

export type Props = EmptyRecord;

/**
 * ShareButton container
 * Handles what to trigger when the optionnaly displayed Button is clicked on
 */
const ShareButton: FunctionComponent<Props> = () => {
  const missingCount = useMissingGovernmentPositionCount();

  const handleShare = useCallback(() => {
    console.log('this is where the magic should be triggered to happen')
  }, []);

  return (
    <Component
      isDisabled={!!missingCount}
      missingPositionCount={missingCount}
      onShare={handleShare}
    />
  );
};

export default ShareButton;
