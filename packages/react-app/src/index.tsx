import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UseWalletProvider } from 'use-wallet';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import NavBar from './components/Navbar';
import theme from './theme';

import './index.css';
import 'sanitize.css';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={42}>
        <NavBar />
        <App />
      </UseWalletProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
