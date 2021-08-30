import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { GrShareOption } from 'react-icons/gr';
import SwipeableViews from 'react-swipeable-views';
import Candidates from '../Candidates';
import Config from '../Government';

function TabPanel (props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
    // width: 500,
  },
  fab: {
    position: 'fixed',
    top: theme.spacing(8),
    right: theme.spacing(2)
  }
}));

export default function FullWidthTabs (props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { govList } = props;
  const { candidateList } = props;
  const { selectorList } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="À propos" {...a11yProps(0)} />
          <Tab label="Mon gouvernement" {...a11yProps(1)} />
          <Tab label="Personnalités" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="about">
            <p>
              Ce site est un projet parallèle à la
              {' '}
              <a href="https://primairepopulaire.fr/">Primaire Populaire</a>
              .
              Sur le site principal vous pouvez voir la démarche du projet en
              détail.
            </p>

            <p>
              <a href="http://mariecasays.com/">Marie Casaÿs</a>
              {' '}
              a réalisé les
              illustrations des candidats.
            </p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Config
            selectorList={selectorList}
            govList={govList}
            updateConfig={props.updateConfig}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Candidates candidateList={candidateList} />
        </TabPanel>
      </SwipeableViews>
      <Fab
        aria-label="Share"
        className={classes.fab}
        color="inherit"
        onClick={props.updateConfigRef}
      >
        <GrShareOption />
      </Fab>
    </div>
  );
}
