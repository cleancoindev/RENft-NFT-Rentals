import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { MaterialColor } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: 700,
  },
  desc: {
    display: 'inline',
  },
}));

type ListItem = {
  color?: MaterialColor;
  title: string;
  text: string | React.ReactElement;
};

const ListItem: React.FC<ListItem> = ({ color, title, text }) => {
  const classes = useStyles();

  return (
    <MaterialListItem alignItems="flex-start">
      <ListItemText
        primary={
          <>
            <Typography className={classes.title} variant="body1" color={color}>
              {title}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.desc}
              color="textPrimary"
            >
              {text}
            </Typography>
          </>
        }
      />
    </MaterialListItem>
  );
};

export default ListItem;
