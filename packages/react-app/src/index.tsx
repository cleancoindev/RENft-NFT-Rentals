import React from 'react';
import ReactDOM from 'react-dom';
import { UseWalletProvider } from 'use-wallet';

import App from './App';
import NavBar from './components/Navbar';

import './index.css';
import 'sanitize.css';

ReactDOM.render(
  <UseWalletProvider chainId={42}>
    <NavBar
      buttonsList={[
        { variant: 'outlined', label: 'List NFT' },
        { variant: 'outlined', label: 'Connect' },
      ]}
    />
    <App />
  </UseWalletProvider>,
  document.getElementById('root')
);
