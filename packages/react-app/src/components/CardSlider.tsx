import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import IconLeft from '@material-ui/icons/ArrowBackIos';
import IconRight from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(2, 2),
    marginLeft: theme.spacing(2),
  },
  icon: {
    fontSize: theme.typography.pxToRem(14),
  },
  area: {
    position: 'relative',
    top: '20px',
    textAlign: 'end',
  },
}));

const CardSilder: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.area}>
      <IconButton className={classes.btn} size="small">
        <IconLeft className={classes.icon} />
      </IconButton>

      <IconButton className={classes.btn} size="small">
        <IconRight className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default CardSilder;
