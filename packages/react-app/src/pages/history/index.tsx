import React, {useState, useContext, useEffect, ProfilerProps } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Card } from '@material-ui/core';
import { request } from 'graphql-request';
import { userProfileQuery } from '../../config/graph';
import WalletContext from '../../ctx/wallet';

import CardInfoIcon from './CardInfoIcon';
import CardGraphic from './CardGraphic';

import './HistoryPage.css';
import rentIcon from '../../assets/img/rent.svg';
import leaseIcon from '../../assets/img/lease.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  subName: {
    fontSize: theme.typography.pxToRem(14),
    textAlign: 'center',
    padding: theme.spacing(2, 0),
  },
  itemColumn: {
    maxWidth: '140px',
    width: '100%',
  },
  yourHistory: {
    margin: theme.spacing(2, 0, 0, 0),
    padding: '0',
    width: '100%',
  },
  moveRight: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const HistoryPage: React.FC = () => {
  const [profile, setProfile] = useState();
  const { wallet } = useContext(WalletContext);
  const classes = useStyles();
  const endpoint = 'https://api.thegraph.com/subgraphs/name/rentft/rentftv1';
  useEffect(() => {
    // Create an scoped async function in the hook
    const getProfile = async (): Promise<void> => {
      if (wallet) {
        const profile = await request(
          endpoint,
          userProfileQuery(wallet.account)
        );
      }
      // remove the spreading of the dummyNfts here in the future
      // was getting an error property user does not exist on type profile && obj is possibly undefined while setting this
      // if (profile) setProfile(profile.user);
    };
    getProfile();
  }, []);
  // profile data is coming if it is null show you haven't rented or own any nft's yet else there need to be two small tables or lists 1. for rented nft 2. for owner nft all data is coming
  return (
    <Card raised color="#fff">
      <Container className={classes.yourHistory}>
        <Typography className={classes.moveRight} variant="h6">
          Your history
        </Typography>
        <Divider />
      </Container>
      <Grid container spacing={0} className={classes.root}>
        <Grid item className="itemColumn">
          <Typography
            className={classes.subName}
            variant="subtitle2"
            color="textPrimary"
          >
            Rented NFTs
          </Typography>
          <Divider />
        </Grid>

        <Grid item className="itemCont">
          <Typography
            className={classes.subName}
            variant="subtitle2"
            color="textSecondary"
          >
            Overview
          </Typography>
          <Divider />

          <CardInfoIcon
            type="plus"
            cardContentText="# currently rented"
            counter={5}
            procent={1}
            icon={rentIcon}
          />
          <CardInfoIcon
            type="minus"
            cardContentText="# currently leased"
            counter={3}
            procent={13}
            icon={leaseIcon}
          />

          <div>
            <CardGraphic
              id="mgraphid"
              name="Total Sales:"
              color="#f54b42"
              startRun={25}
            />
            <CardGraphic
              id="twoGrapich"
              name="Total Interest:"
              color="#42ecf5"
              startRun={1245}
            />
          </div>

          <CardInfoIcon
            type="plus"
            cardContentText="# completed rented"
            counter={34}
            procent={1}
            icon={rentIcon}
          />
          <CardInfoIcon
            type="plus"
            cardContentText="# completed leased"
            counter={7}
            procent={23}
            icon={leaseIcon}
          />
        </Grid>

        <Grid item className="itemColumn">
          <Typography
            className={classes.subName}
            variant="subtitle2"
            color="textPrimary"
          >
            Leased NFTs
          </Typography>
          <Divider />
        </Grid>
      </Grid>
    </Card>
  );
};

export default HistoryPage;
