import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconFull from '@material-ui/icons/Fullscreen';
import Paper from '@material-ui/core/Paper';

import CardProcent from './CardProcent';
import CardContent from './CardContent';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(1.2, 1),
    maxWidth: 260,
    width: '100%',
    display: 'inline-flex',
    position: 'relative',
    overflow: 'visible',
  },
  iconArea: {
    minWidth: '48px',
    height: '48px',
    margin: theme.spacing(0.2),
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '35px',
    height: '35px',
  },
}));

type CardInfoIcon = {
  name: string;
  run: number;
  procent: number;
  type: string;
  icon?: string;
};

const CardInfoIcon: React.FC<CardInfoIcon> = ({
  name,
  run,
  procent,
  type,
  icon,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card}>
      <Box className={classes.iconArea}>
        {icon ? (
          <img src={icon} className={classes.icon} alt="rent or lease icon" />
        ) : (
          <IconFull className={classes.icon} />
        )}
      </Box>
      <CardContent name={name} run={run} />
      <CardProcent procent={procent} type={type} />
    </Paper>
  );
};

export default CardInfoIcon;
