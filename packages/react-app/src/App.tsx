import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useWallet } from 'use-wallet';

import WalletContext from './ctx/wallet';
import Overview from './pages/overview';
import Rent from './pages/rentable';
import YourHistory from './pages/history';
import NavBar from './components/Navbar';

const App: React.FC = () => {
  const wallet = useWallet<'injected'>();

  return (
    <WalletContext.Provider value={{ wallet }}>
      <NavBar />

      <Switch>
        <Route path="/dashboard">
          <Box p={6}>
            <YourHistory />
          </Box>
        </Route>
        <Route path="/overview/:nftId">
          <Box p={6}>
            <Overview />
          </Box>
        </Route>
        {/* TODO: this should be a 404 */}
        <Route path="/">
          <Rent />
        </Route>
      </Switch>
    </WalletContext.Provider>
  );
};

export default App;
