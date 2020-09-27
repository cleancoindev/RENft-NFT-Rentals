import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';

import WalletContext from './ctx/wallet';
import Overview from './pages/overview';
import Rent from './pages/rentable';
import YourHistory from './pages/history';
import NavBar from './components/Navbar';

const App: React.FC = () => {
  const wallet = useWallet<'injected'>();
  const [web3, setWeb3] = useState();

  return (
    <WalletContext.Provider value={{ wallet, web3, setWeb3 }}>
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
