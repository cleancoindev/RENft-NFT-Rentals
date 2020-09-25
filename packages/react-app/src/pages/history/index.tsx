import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Card } from '@material-ui/core';

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

/**
 * Генерируем статичную таблицу, ибо можем себе
 * это позволить. С однй стороны все данные можно отдавать
 * пропсами и разложить Table ROW на компоненты. Но с другой
 * можно добиться такого же результата обычным CSS
 */
const HistoryPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Card raised>
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
            type="minus"
            cardContentText="# currently rented"
            counter={34}
            procent={25}
            icon={rentIcon}
          />
          <CardInfoIcon
            type="plus"
            cardContentText="# currently leased"
            counter={7}
            procent={70}
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
            type="minus"
            cardContentText="# completed rented"
            counter={34}
            procent={25}
            icon={rentIcon}
          />
          <CardInfoIcon
            type="plus"
            cardContentText="# completed leased"
            counter={7}
            procent={70}
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
