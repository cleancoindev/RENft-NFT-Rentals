import { Wallet } from 'use-wallet';

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
};
