import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';

import Overview from './pages/overview';
import Rent from './pages/rentable';
import History from './pages/history';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/overview">
        <Box p={6}>
          <Overview />
        </Box>
      </Route>
      <Route path="/rent">
        <Rent />
      </Route>
      <Route path="/">
        <Box p={6}>
          <History />
        </Box>
      </Route>
    </Switch>
  </Router>
);

export default App;
