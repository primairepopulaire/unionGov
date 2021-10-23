import { FunctionComponent, useCallback } from 'react';
import Component from '../components/ShareButton';
import { useAppSelector } from '../hooks/redux';
import useMissingGovernmentPositionCount from '../hooks/use-missing-government-position-count';
import { configSelector } from '../redux/Config/selectors';
import { EmptyRecord } from '../types';
import { shallowEqual } from 'react-redux';
export type Props = EmptyRecord;

/**
 * ShareButton container
 * Handles what to trigger when the optional Button is clicked on
 */
const ShareButton: FunctionComponent<Props> = () => {
  const missingCount = useMissingGovernmentPositionCount();

  const copyToClipboard = (text: string) => {
    const textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  const config = useAppSelector(configSelector, shallowEqual);
  const { configRef } = config
  const handleShare = useCallback(() => {
    if (configRef) {
      copyToClipboard(configRef)
    }
  }, [configRef]);

  return (
    <Component
      isDisabled={false}
      missingPositionCount={missingCount}
      onShare={handleShare}
    />
  );
};

export default ShareButton;
