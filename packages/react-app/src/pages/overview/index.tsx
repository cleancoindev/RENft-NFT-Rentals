import React, { useEffect, useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import { Container, Card, Box } from '@material-ui/core';
import { request } from 'graphql-request';
import { useParams } from 'react-router-dom';
import WalletContext from '../../ctx/wallet';
import { ownersClaim, rent, returnNft } from '../../config/index';
import { productQuery, Product, ProductProps } from '../../config/graph';
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

const Overview: React.FC<ProductProps> = () => {
  // Viraz: Note -> path has to include the id i.e overview/1
  // Naz: Yup. Just the skeleton, the barebones for now
  const { nftId } = useParams();
  const { wallet, web3 } = useContext(WalletContext);
  const [product, setProduct] = useState<Product>();
  // dummy value this will coming from the state or path
  const classes = useStyles();
  const endpoint = 'https://api.thegraph.com/subgraphs/name/rentft/rentftv1';

  // Create an scoped async function in the hook
  const getProduct = useCallback(async (): Promise<void> => {
    const nftInfo = await request(endpoint, productQuery(nftId));
    setProduct(nftInfo.product);
    console.log(nftInfo.product);
  }, [nftId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // need to be connect with buttons
  const handleRent = async (e) => {
    e.preventDefault();
    if (product && wallet) {
      await rent(
        web3,
        wallet.account || '',
        product.duration,
        product.address,
        product.id
      );
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    if (product && wallet)
      await returnNft(web3, product.address, product.id, wallet.account);
  };

  const claimYield = async (e) => {
    e.preventDefault();
    if (product && wallet)
      await ownersClaim(web3, product.address, product.id, wallet.account);
  };

  // add the dynamic values here stored in userProfile object check graph dashboard or github schema to see what data is available
  // due to list item unable to add but it will be like product.id, product.price etc..
  // FYI the price would be in wei and needs to be converted to eth form
  // need to add to list item
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
                {product &&
                  product.borrower === wallet?.account &&
                  !product.available &&
                  product.owner !== wallet?.account && (
                    <Button label="Return" variant="outlined" />
                  )}
                {product &&
                  product.available &&
                  product.owner !== wallet?.account && (
                    <Button
                      label="Rent"
                      variant="contained"
                      handleClick={handleRent}
                    />
                  )}
                {/* TODO: return only if the address rented it */}
                <Button
                  label="Return"
                  variant="contained"
                  handleClick={handleReturn}
                />
                <Button
                  label="Claim Yield"
                  variant="contained"
                  handleClick={claimYield}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <List className={classes.paper}>
                <ListItem title="ID" text={product?.id || '-'} />
                <ListItem title="NFT Address" text={product?.address || '-'} />
                <ListItem
                  title="Price"
                  text={product ? `${String(product.price / 1e18)} DAI` : '-'}
                />
                <ListItem
                  title="Collateral"
                  text={
                    product ? `${String(product.collateral / 1e18)} DAI` : '-'
                  }
                />
                <ListItem
                  title="Rental Duration"
                  text={String(product?.duration) || '-'}
                />
                <ListItem title="Owner Adress" text={product?.owner || '-'} />
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
