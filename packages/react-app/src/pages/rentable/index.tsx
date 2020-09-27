import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Link as MaterialLink, Box } from '@material-ui/core';

import { allProductsQuery } from '../../config/graph';
// import pretty2 from '../../assets/img/pretty2.svg';
// import pretty3 from '../../assets/img/pretty3.svg';
// import pretty4 from '../../assets/img/pretty4.svg';
// import pretty5 from '../../assets/img/pretty5.svg';

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
  available: boolean;
  borrowedAt?: number;
  borrower?: string;
  img?: string;
  price?: number;
  address: string;
  duration?: number;
  collateral?: number;
};

type RentableProps = {
  rows?: RentItem[];
};

// sole purpose of these is to make the front look prettier for the purposed of the demo
const dummyNfts: RentItem[] = [
  {
    name: "Nick's magestic LAND",
    img:
      'https://lh3.googleusercontent.com/5padW9Z6NKrjAf26AIAGj6WQZ3P3wlLsFQX28teWoNIXm4hU9EaJtzDr01oFiKyKqEe_lgIglOCrFpncE3gXvD8=s0-s1000',
    address: '0xafeFDb5EAa5aaB9D9100D0d3ECa7cA7B18403267',
    available: true,
    borrowedAt: 1600973772,
    borrower: '0xb2167eB0FB666211a00301b9D81CBBCEc82ff82a',
    collateral: 12156213120000000000,
    duration: 0,
    id: '0x2',
    owner: '0xc5D2A183bcD1ea75d34cb7392C6F1880cB36c0AF',
    price: 155643222362000000000,
  },
  {
    name: "Apoorv's crazy smart contract skillz",
    img:
      'https://lh3.googleusercontent.com/4n3zCEwPTaPmKVSqPwankbTLCDqVDttRt1DDGPM5ZBWxwiKRV51Ue50C8RBIsq3zMIcPuHlveZcZzZg6tEhmSoOE=s0-s1000',
    address: '0xb2167eB0FB666211a00301b9D81CBBCEc82ff82a',
    available: true,
    borrowedAt: 1600973772,
    borrower: '0xc5D2A183bcD1ea75d34cb7392C6F1880cB36c0AF',
    collateral: 52156213120000000000,
    duration: 0,
    id: '0x3',
    owner: '0xafeFDb5EAa5aaB9D9100D0d3ECa7cA7B18403267',
    price: 933243222362000000000,
  },
  {
    name: "Viraz's formidable leadership and all coding skills",
    img:
      'https://lh3.googleusercontent.com/h5KUERe22C5szltg8d-FslmwtGSvHQgWhoL99gUussLogJxLKtcZSLK8sBBGaTRcAgb-kUxbdikq0pJSvH3VCD9Y=s0-s1000',
    address: '0xc5D2A183bcD1ea75d34cb7392C6F1880cB36c0AF',
    available: true,
    borrowedAt: 1600973772,
    borrower: '0xb2167eB0FB666211a00301b9D81CBBCEc82ff82a',
    collateral: 12156213120000000000,
    duration: 0,
    id: '0x4',
    owner: '0xc5D2A183bcD1ea75d34cb7392C6F1880cB36c0AF',
    price: 155643222362000000000,
  },
  {
    name: 'Naz',
    img:
      'https://lh3.googleusercontent.com/f6lk8L3S-XzoMtobsEdbAKuoXYWdz8cmHmKMNzVQaDqLGcvrliK8Ln2qi_g2pTBDbftEB72T_L0vPy8CdTs4x2k=s0-s1000',
    address: '0x50c3374fd62dd09F18ccc01e1c20f5dE66cD6dEA',
    available: true,
    borrowedAt: 1600973772,
    borrower: '0xb2167eB0FB666211a00301b9D81CBBCEc82ff82a',
    collateral: 12156213120000000000,
    duration: 0,
    id: '0x5',
    owner: '0xc5D2A183bcD1ea75d34cb7392C6F1880cB36c0AF',
    price: 155643222362000000000,
  },
];

// TODO: loading spinner when useEffect kicks off the fetch
const Rentable: React.FC<RentableProps> = () => {
  const [allProducts, setProducts] = useState<RentItem[]>();
  const classes = useStyles();
  const endpoint = 'https://api.thegraph.com/subgraphs/name/rentft/rentftv1';
  const randoms = useState([
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
    [Math.random(), Math.random()],
  ])[0];
  useEffect(() => {
    // Create an scoped async function in the hook
    const getProducts = async (): Promise<void> => {
      const { products }: { products: RentItem[] } = await request(
        endpoint,
        allProductsQuery
      );
      // remove the spreading of the dummyNfts here in the future
      setProducts([...products, ...dummyNfts]);
    };
    getProducts();
  }, []);
  // for duration we should just show row.duration i think instead of min max it is coming from graph
  return (
    <Box p={6}>
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
              allProducts.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography>{parseInt(row.id, 16)}</Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.minInfo}>
                    <CardMedia
                      component="img"
                      className={classes.img}
                      image={row.img}
                    />
                    <Typography className={classes.href} noWrap variant="body2">
                      <MaterialLink href={`/overview/${row.address}`}>
                        {row.address}
                      </MaterialLink>
                    </Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.cell}>
                    <Typography color="primary" variant="body2">
                      {/* TODO: my brain does not work anymore. double type conversiosn bonanza */}
                      {row.price &&
                        parseFloat(String(row.price / 1e18)).toFixed(3)}{' '}
                      DAI
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
                    <Typography component="a" className={classes.href}>
                      {row.duration} Days
                    </Typography>
                  </TableCell>

                  <TableCell align="left" className={classes.cell}>
                    <Typography color="secondary" variant="body2">
                      {row.collateral &&
                        parseFloat(String(row.collateral / 1e18)).toFixed(
                          3
                        )}{' '}
                      DAI
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="overline"
                      component={Link}
                      to={`/overview/${row.address}`}
                    >
                      View
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Rentable;
