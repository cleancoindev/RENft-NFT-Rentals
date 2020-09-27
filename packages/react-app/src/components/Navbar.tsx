import React, { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Box, Grid, Link as MaterialLink } from '@material-ui/core';
import { MetaMaskButton, Blockie, Loader } from 'rimble-ui';

import WalletContext from '../ctx/wallet';
import Button from './Button';
import { connectAudio } from '../decorators';
import AddProduct from './AddProduct';

const useStyles = makeStyles((theme) => ({
  app: { boxShadow: 'none', display: 'flex' },
  title: {
    flexGrow: 1,
  },
  blackButton: {
    background: theme.palette.secondary.main,
  },
  noUnderline: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const { wallet } = useContext(WalletContext);
  const [leaseModalOpen, setLeaseModalOpen] = useState<boolean>(false);

  const connectWallet = useCallback(() => {
    if (!wallet) {
      return;
    }
    wallet.connect('injected');
  }, [wallet]);
  // const disconnectWallet = useCallback((): void => wallet.reset(), [wallet]);
  const userAddress = useCallback((): string => {
    if (!wallet || !wallet.account) {
      return '';
    }
    return `${wallet.account.substr(0, 5)}...${wallet.account.substr(
      wallet.account.length - 5,
      5
    )}`;
  }, [wallet]);

  const playSound = useCallback(async () => {
    await connectAudio.play();
  }, []);

  const toggleModal = (): void => setLeaseModalOpen(!leaseModalOpen);

  return (
    <AppBar className={classes.app} position="static" color="transparent">
      <Container>
        <Toolbar disableGutters>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Typography variant="h3">reNFT</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                className={classes.noUnderline}
                component={Link}
                onClick={playSound}
                to="/"
              >
                HOME
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                className={classes.noUnderline}
                component={Link}
                onClick={playSound}
                to="/dashboard"
              >
                DASHBOARD
              </Typography>
            </Grid>

            <Box marginLeft="auto">
              <Box display="flex" flexDirection="row">
                <Button
                  variant="outlined"
                  label="LEASE YOUR NFT"
                  handleClick={toggleModal}
                />

                {leaseModalOpen && (
                  <AddProduct
                    isOpen={leaseModalOpen}
                    setIsOpen={setLeaseModalOpen}
                  />
                )}

                {wallet?.status === 'disconnected' && (
                  <MetaMaskButton.Outline onClick={connectWallet}>
                    <Typography>Connect with MetaMask</Typography>
                  </MetaMaskButton.Outline>
                )}
                {wallet?.status === 'connecting' && (
                  <Box alignSelf="center" p={2}>
                    <Loader />
                  </Box>
                )}
                {wallet?.status === 'connected' && (
                  <Box component="div" display="inline">
                    <Box display="flex" justifyContent="center">
                      <Blockie />
                      <Box alignSelf="center" p={1}>
                        <Typography>
                          <MaterialLink
                            underline="none"
                            href={`https://etherscan.io/address/${wallet.account}`}
                            color="textSecondary"
                          >
                            {userAddress()}
                          </MaterialLink>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Toolbar>
        <Divider />
      </Container>
    </AppBar>
  );
};

export default NavBar;
