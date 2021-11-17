import { FunctionComponent, useCallback, useState } from 'react';
import Component from '../components/ShareButton';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import useMissingGovernmentPositionCount from '../hooks/use-missing-government-position-count';
import { configSelector } from '../redux/Config/selectors';
import { EmptyRecord } from '../types';
import { shallowEqual } from 'react-redux';
import { governmentSelector } from '../redux/Government/selectors'
import { setGovernmentById } from '../redux/Government/effects';
import { ConfigState } from '../redux/Config/state';
import { GovernmentState } from '../redux/Government/state';
export type Props = EmptyRecord;

const PRIMARY_LINK = 'http://localhost:9000/'

/**
 * ShareButton container
 * Handles what to trigger when the optional Button is clicked on
 */
const ShareButton: FunctionComponent<Props> = () => {
  const missingCount = useMissingGovernmentPositionCount();
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const config: ConfigState = useAppSelector(configSelector, shallowEqual);
  const governement: GovernmentState = useAppSelector(governmentSelector, shallowEqual)
  const { id } = config
  const handleShare = useCallback(() => {
    setIsOpen(!isOpen)
    dispatch(setGovernmentById({ config, governement }))
    if (id) {
      setShareLink(PRIMARY_LINK + id)
    }
  }, [id, governement, isOpen]);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(PRIMARY_LINK + id)
  }, [id])

  return (
    <Component
      isDisabled={missingCount !== 0}
      missingPositionCount={missingCount}
      onShare={handleShare}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shareLink={shareLink}
      onCopy={onCopy}
    />
  );
};

export default ShareButton;
