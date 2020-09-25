import React, { useCallback } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Box, Grid } from '@material-ui/core';
import { useWallet } from 'use-wallet';

import Button from './Button';

const useStyles = makeStyles((theme) => ({
  app: { boxShadow: 'none', display: 'flex' },
  title: {
    flexGrow: 1,
  },
  blackButton: {
    background: theme.palette.secondary.main,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const wallet = useWallet<'injected'>();

  const connectWallet = useCallback(
    (): Promise<void> => wallet.connect('injected'),
    [wallet]
  );
  const disconnectWallet = useCallback((): void => wallet.reset(), [wallet]);

  const preventDefault = (event: React.SyntheticEvent): void =>
    event.preventDefault();

  return (
    <AppBar className={classes.app} position="static" color="transparent">
      <Container>
        <Toolbar disableGutters>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Typography variant="h3">reNFT</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textSecondary">
                <Link
                  underline="none"
                  href="/"
                  onClick={preventDefault}
                  color="textSecondary"
                >
                  HOME
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                <Link
                  underline="none"
                  href="/dashboard"
                  onClick={preventDefault}
                  color="textSecondary"
                >
                  DASHBOARD
                </Link>
              </Typography>
            </Grid>

            <Box marginLeft="auto">
              <Button label="List NFTs" />
              <Button
                label={
                  wallet.status !== 'disconnected' ? 'Disconnect' : 'Connect'
                }
                variant="outlined"
                handleClick={
                  wallet.status !== 'connected'
                    ? connectWallet
                    : disconnectWallet
                }
              />
            </Box>
          </Grid>
        </Toolbar>
        <Divider />
      </Container>
    </AppBar>
  );
};

export default NavBar;
