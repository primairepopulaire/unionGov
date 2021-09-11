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
  reset: CSSProperties;
  resetIcon: CSSProperties;
}

const styles: Styles = {
  misteryItem: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: '20px',
    fontWeight: 500,
    color: 'white',
    borderRadius: '100%',
    width: '40px',
    height: '40px'
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
      <div className="col-10">
        <Typography color={imageUrl ? 'primary' : undefined}>
          {positionName}
        </Typography>
        <CandidateSelect {...props} />
      </div>
      {!!imageUrl && (
        <img className="col-2" src={imageUrl} alt={positionName} />
      )}
      {!imageUrl && (
        <div className="col-2 d-flex align-items-center justify-content-end">
          <Typography
            align="center"
            style={styles.misteryItem}
            className={'justify-content-center align-items-center p-2'}
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
