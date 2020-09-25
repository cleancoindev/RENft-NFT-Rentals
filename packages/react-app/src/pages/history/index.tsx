import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';

import CardInfoGreen from './CardInfoGreen';
import CardInfoBlue from './CardInfoBlue';
import CardGraphic from './CardGraphic';

import './HistoryPage.css';

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
      <Grid container spacing={0} className={classes.root}>
        <Grid item className="itemColumn">
          <Typography className={classes.subName} variant="subtitle2">
            Rented NFTs
          </Typography>
          <Divider />
        </Grid>

        <Grid item className="itemCont">
          <Typography className={classes.subName} variant="subtitle2">
            Overview
          </Typography>
          <Divider />

          <CardInfoBlue
            type="minus"
            name="Current Rented"
            run={34}
            procent={25}
          />
          <CardInfoGreen
            type="plus"
            name="Current Leased"
            run={7}
            procent={70}
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

          {/* Синяя карточка */}
          <CardInfoBlue
            type="minus"
            name="Current Rented"
            run={34}
            procent={25}
          />
          {/* Зелёная карточка */}
          <CardInfoGreen
            type="plus"
            name="Current Leased"
            run={7}
            procent={70}
          />
        </Grid>

        {/* GRID RIGHT ITEM */}
        <Grid item className="itemColumn">
          <Typography className={classes.subName} variant="subtitle2">
            Leased NFT&#39;s
          </Typography>
          <Divider />
        </Grid>
      </Grid>
    </Card>
  );
};

export default HistoryPage;
