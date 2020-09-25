import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import { Typography, Container, Card, Box } from '@material-ui/core';

import ListItem from './ListItem';
import Button from '../../components/Button';
import PreviousRentals from './components/PreviousRentals';
import AvaAndAdress from './components/AvaAndAdress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2, 1.5),
  },
  paper: {
    padding: theme.spacing(1, 0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  img: {
    minHeight: '250px',
    borderRadius: '5px',
    margin: theme.spacing(0, 0, 2, 0),
  },
}));

const Overview: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <Card raised>
        <Box p={2}>
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm={4} md={3} lg={6}>
              <div className={classes.paper}>
                <CardMedia
                  className={classes.img}
                  image="https://image.freepik.com/free-vector/close-up-of-cool-cat_36380-133.jpg"
                />
                <Button label="Rent" variant="contained" />
                <Button label="Return" variant="outlined" />
              </div>
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={3}>
              <List className={classes.paper}>
                <ListItem title="ID" text="1" />
                <ListItem title="NFT NAME" text="Не читаемый текст(" />
                <ListItem title="Price" text="0.001 ETH" />
                <ListItem title="Collaternal" text="0.01ETH" />
                <ListItem
                  title="Rental Duration"
                  text={
                    <>
                      <Typography>Month min</Typography>
                      <Typography>Month min</Typography>
                    </>
                  }
                />
                <ListItem title="Adress" text="THIS IS ADRESS" />
              </List>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={3}>
              <PreviousRentals>
                <AvaAndAdress />
                <AvaAndAdress />
                <AvaAndAdress />
                <AvaAndAdress />
              </PreviousRentals>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default Overview;
