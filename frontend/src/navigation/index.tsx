import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import About from '../pages/About';
import Candidates from '../pages/Candidates';
import Government from '../pages/Government';
import { EmptyRecord } from '../types';

const Navigation: FunctionComponent<EmptyRecord> = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Government</Link>
          </li>
          <li>
            <Link to="/candidates">Candidats</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
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
