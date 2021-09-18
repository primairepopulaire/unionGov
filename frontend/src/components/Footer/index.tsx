import { Link, Typography } from '@material-ui/core';
import { CSSProperties, FunctionComponent, memo } from 'react';
import theme from '../../theme';
import { EmptyRecord } from '../../types';

type Styles = {
  container: CSSProperties;
};

const styles: Styles = {
  container: {
    backgroundColor: theme.palette.grey[50]
  }
};

const Footer: FunctionComponent<EmptyRecord> = memo(() => (
  <footer style={styles.container}>
    <div className="row py-4 px-5 border-top">
      <Typography className="flex-fill" align="justify">
        Ce site est un projet parallèle à la{' '}
        <Link rel="noopener" href="https://primairepopulaire.fr/">
          Primaire Populaire
        </Link>
        . Sur le site principal vous pouvez voir la démarche du projet en
        détail.
      </Typography>

      <Typography className="mt-3 flex-fill" align="center">
        <Link rel="noopener" href="http://mariecasays.com/">
          Marie Casaÿs
        </Link>{' '}
        a réalisé les illustrations des candidats.
      </Typography>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

export default Footer;
