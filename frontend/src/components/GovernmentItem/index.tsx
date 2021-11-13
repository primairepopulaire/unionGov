import { Typography } from '@material-ui/core';
import { CSSProperties, FunctionComponent, memo } from 'react';
import CandidateSelect, { Props as SelectProps } from '../../containers/SelectCandidate';
import theme from '../../theme';

export type Props = {
  /** The associated candidate uri */
  imageUrl?: string;
  positionName: string;
  onReset: () => void;
} & SelectProps;

type Styles = {
  misteryItem: CSSProperties;
  image: CSSProperties;
  reset: CSSProperties;
  resetIcon: CSSProperties;
}

const styles: Styles = {
  misteryItem: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    borderRadius: '100%',
    width: 40,
    height: 40,
    paddingTop: 5
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 4
  },
  reset: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    minWidth: 40,
    minHeight: 40
  },
  resetIcon: {
    fontSize: 26,
    color: theme.palette.secondary.main
  }
};

const GovernmentItem: FunctionComponent<Props> = memo(
  ({ imageUrl, positionName, onReset, ...props }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="col pr-4">
        <Typography color={imageUrl ? 'primary' : undefined}>
          {positionName}
        </Typography>
        <CandidateSelect {...props} />
      </div>
      {!!imageUrl && (
        <img style={styles.image} src={imageUrl} alt={' '} />
      )}
      {!imageUrl && (
        <div className="d-flex align-items-center justify-content-end">
          <Typography
            align="center"
            variant="h6"
            style={styles.misteryItem}
            className={'justify-content-center align-items-center'}
          >
            ?
          </Typography>
        </div>
      )}
      {!!imageUrl && <div
        style={styles.reset}
        className="d-flex align-items-start justify-content-end"
        onClick={onReset}
      >
        <i className="bi-x" style={styles.resetIcon} />
      </div>}
    </li>
  )
);
GovernmentItem.displayName = 'GovernmentItem';

export default GovernmentItem;
