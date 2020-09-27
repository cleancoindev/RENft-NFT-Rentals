import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  app: { boxShadow: 'none', display: 'flex' },
  title: {
    flexGrow: 1,
  },
  blackButton: {
    background: theme.palette.secondary.main,
  },
  noUnderline: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
}));

type NftTabProps = {
  nftId?: string;
  nftAddress?: string;
};

const NftTab: React.FC<NftTabProps> = ({ nftId, nftAddress }) => {
  const classes = useStyles();
  console.log(nftAddress);

  return (
    <Box p={3} display="flex" flexDirection="column">
      <Typography>{nftAddress?.substr(0, 8)}...</Typography>
      <Box p={1}>
        <Typography
          className={classes.noUnderline}
          to={`/overview/${nftId || ''}`}
          component={Link}
          variant="overline"
        >
          <Button variant="outlined">View</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default NftTab;
