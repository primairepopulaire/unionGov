import { Button, Typography } from '@material-ui/core';
import { CSSProperties, FunctionComponent, memo } from 'react';
import theme from '../../theme';

export type Props = {
  isDisabled?: boolean;
  /** The number of positions still waiting for a user-candidate */
  missingPositionCount?: number;
  onShare: () => void;
}

type Styles = {
  separator: CSSProperties;
  shareIcon: CSSProperties;
  shareIconDisabled: CSSProperties;
};

const styles: Styles = {
  separator: {
    height: 0.5,
    backgroundColor: theme.palette.divider,
    width: '100%'
  },
  shareIcon: {
    fontSize: 26,
    color: theme.palette.secondary.main
  },
  shareIconDisabled: {
    fontSize: 26,
    color: theme.palette.grey[400]
  }
};

const ShareButton: FunctionComponent<Props> = memo(
  ({ isDisabled = false, missingPositionCount, onShare }) => (
    <div className="container">
      <div className="row mx-4">
        <Button
          className="flex-fill text-center align-items-center justify-content-center d-flex"
          disabled={isDisabled}
          variant="outlined"
          size="large"
          color="primary"
          onClick={onShare}
          endIcon={
            <i
              className="pl-2 bi-share m-auto"
              style={styles[isDisabled ? 'shareIconDisabled' : 'shareIcon']}
            />
          }
        >
          Partager
        </Button>
      </div>
      {!!missingPositionCount && (
        <div className="row mx-4 mt-2">
          <Typography
            className="flex-fill pr-2"
            variant="caption"
            color="primary"
          >
            Encore {missingPositionCount} poste{missingPositionCount > 1 ? 's' : ''} à
            attribuer
          </Typography>
        </div>
      )}
    </div>
  )
);
ShareButton.displayName = 'ShareButton';

export default ShareButton;
