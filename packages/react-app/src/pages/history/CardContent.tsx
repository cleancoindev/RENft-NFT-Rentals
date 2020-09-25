import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cont: {
    padding: theme.spacing(0.2),
  },
  name: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary,
  },
  desc: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
  },
}));

type CardContent = {
  cardContentText: string;
  counter: number;
};

const CardContent: React.FC<CardContent> = ({ cardContentText, counter }) => {
  const classes = useStyles();

  return (
    <div className={classes.cont}>
      <Typography
        noWrap
        align="left"
        variant="subtitle2"
        className={classes.name}
      >
        {cardContentText}
      </Typography>
      {/* WTF IS RUN!? */}
      <Typography noWrap align="left" className={classes.desc}>
        {counter}
      </Typography>
    </div>
  );
};

export default CardContent;
