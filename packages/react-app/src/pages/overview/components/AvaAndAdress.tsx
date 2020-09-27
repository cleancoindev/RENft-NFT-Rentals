import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { deepOrange, green } from '@material-ui/core/colors';
import Pretty1 from '../../../assets/img/pretty1.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

const AvaAndAdress: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar variant="rounded" className={classes.rounded}>
        <img alt="lady hear me tonight" src={Pretty1} />
      </Avatar>
      <Typography>0x1237821381278...</Typography>
    </div>
  );
};

export default AvaAndAdress;
