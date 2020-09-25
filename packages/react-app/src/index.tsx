import React from 'react';
import ReactDOM from 'react-dom';
import { UseWalletProvider } from 'use-wallet';

import App from './App';

import './index.css';
import 'sanitize.css';

ReactDOM.render(
  <UseWalletProvider chainId={42}>
    <App />
  </UseWalletProvider>,
  document.getElementById('root')
);
