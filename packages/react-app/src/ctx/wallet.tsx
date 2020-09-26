import { createContext } from 'react';
import { WalletContextType } from '../types';

const WalletContext = createContext<WalletContextType>({});

export default WalletContext;
