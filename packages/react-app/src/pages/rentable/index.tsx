import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { request } from 'graphql-request';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, Card, Link as MaterialLink } from '@material-ui/core';
import { allProductsQuery } from '../../config/graph';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '1100px',
    width: '100%',
  },
  minInfo: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '250px',
  },
  img: {
    minWidth: '40px',
    height: '50px',
    display: 'inline-block',
    borderRadius: '4px',
    marginRight: '15px',
  },
  href: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary,
  },
  cell: {
    minWidth: '110px',
  },
}));

export type RentItem = {
  id: string;
  name: string;
  owner: string;
  img: string;
  price: number;
  address: string;
  duration: number;
  collateral: number;
};

type RentableProps = {
  rows?: RentItem[];
};

const Rentable: React.FC<RentableProps> = () => {
  const [allProducts, setProducts] = useState<RentItem[]>();
  const classes = useStyles();
  const endpoint = 'https://api.thegraph.com/subgraphs/name/rentft/rentftv1';
  useEffect(() => {
    // Create an scoped async function in the hook
    const getProducts = async (): Promise<void> => {
      const { products }: { products: RentItem[] } = await request(
        endpoint,
        allProductsQuery
      );
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <Card raised>
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">NFT Address</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Rental Duration</TableCell>
              <TableCell align="left">Collateral</TableCell>
              <TableCell align="right">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts &&
              allProducts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography>{row.id}</Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.minInfo}>
                    <CardMedia className={classes.img} image={row.img} />
                    <Typography className={classes.href} noWrap variant="body2">
                      <MaterialLink href={`/overview/${row.address}`}>
                        {row.address}
                      </MaterialLink>
                    </Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.cell}>
                    <Typography color="primary" variant="body2">
                      {row.price} DAI
                    </Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.cell}>
                    <Typography
                      component="a"
                      href={row.owner}
                      className={classes.href}
                    >
                      {row.owner}
                    </Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.cell}>
                    <Typography variant="subtitle2">MIN</Typography>
                    <Typography variant="subtitle2">MAX</Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.cell}>
                    <Typography color="secondary" variant="body2">
                      {row.collateral} DAI
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Button component="a" variant="outlined" href="#">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Rentable;
