import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import IconR from '@material-ui/icons/ListSharp';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(2, 1),
    maxWidth: 320,
    display: 'flex',
  },
  iconArea: {
    width: '38px',
    height: '38px',
    margin: theme.spacing(0.2),
    borderRadius: '4px',
    display: 'flex',
  },
  green: {
    backgroundColor: '#81c784',
  },
}));

type CardInfo = {
  procent: number;
  type: string;
};

const CardInfo: React.FC<CardInfo> = () => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.card}>
      <Box className={`${classes.iconArea} ${classes.green}`}>
        <IconR />
      </Box>
    </Paper>
  );
};
