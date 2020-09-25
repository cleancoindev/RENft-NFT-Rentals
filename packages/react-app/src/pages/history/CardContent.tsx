import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cont: {
    padding: theme.spacing(0.2),
  },
  name: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.secondary.dark,
  },
  desc: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 700,
  },
}));

type CardContent = {
  name: string;
  run: number;
};

const CardContent: React.FC<CardContent> = ({ name, run }) => {
  const classes = useStyles();

  return (
    <div className={classes.cont}>
      <Typography
        noWrap
        align="left"
        variant="subtitle2"
        className={classes.name}
      >
        {name}
      </Typography>
      <Typography noWrap align="left" className={classes.desc}>
        {run}
      </Typography>
    </div>
  );
};

export default CardContent;
