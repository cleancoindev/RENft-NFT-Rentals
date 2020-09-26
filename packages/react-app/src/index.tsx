import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UseWalletProvider } from 'use-wallet';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import theme from './theme';

import './index.css';
import 'sanitize.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <UseWalletProvider chainId={42}>
      <Router>
        <App />
      </Router>
    </UseWalletProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
