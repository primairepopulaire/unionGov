import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from '../pages/About';
import Candidates from '../pages/Candidates';
import Government from '../pages/Government';
import { EmptyRecord } from '../types';

function a11yProps (index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const TABS = [
  { label: 'gouvernement', ...a11yProps(0), path: '/' },
  { label: 'personnalités', ...a11yProps(1), path: '/candidates' },
  { label: 'à propos', ...a11yProps(2), path: '/about' }
];

const Navigation: FunctionComponent<EmptyRecord> = () => (
  <Router>
    <div>
      <AppBar position="static">
        <Route render={({ history, location }) => (
          <Tabs
            value={TABS.findIndex(tab => tab.path === location.pathname)}
            onChange={(_, index) => {
              if (typeof index === typeof 123 && TABS[index]) {
                history.push(TABS[index].path);
              }
            }}
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {TABS.map(props => <Tab key={`nav-tab-${props.label}`} {...props} />)}
          </Tabs>
        )} />
      </AppBar>
      <Switch>
        <Route path="/candidates">
          <Candidates />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Government />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default Navigation;
