import { Wallet } from 'use-wallet';
import Web3 from 'web3';

export type Optional<T> = T | undefined;
export type ButtonVariant = Optional<'text' | 'outlined' | 'contained'>;
export type MaterialColor = Optional<
  | 'inherit'
  | 'initial'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error'
>;

export type WalletContextType = {
  wallet?: Wallet<'injected'>;
  web3?: Web3;
  setWeb3?: (Web3) => void;
};
