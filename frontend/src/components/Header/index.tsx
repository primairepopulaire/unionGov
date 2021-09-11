import { Typography } from '@material-ui/core';
import { CSSProperties, FunctionComponent, memo } from 'react';
import theme from '../../theme';
import { EmptyRecord } from '../../types';

type Styles = {
  container: CSSProperties;
  text: CSSProperties;
};

const styles: Styles = {
  container: {
    backgroundColor: theme.palette.primary.main,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.palette.secondary.main,
    borderBottomStyle: 'solid'
  },
  text: {
    color: '#fff'
  }
};

const Header: FunctionComponent<EmptyRecord> = memo(() => (
  <div style={styles.container} className="p-4">
    <Typography style={styles.text} variant="h5">À nous de choisir !</Typography>
  </div>
));
Header.displayName = 'Header';

export default Header;
