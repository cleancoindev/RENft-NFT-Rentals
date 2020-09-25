import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';

import Overview from './pages/overview';
import Rent, { RentItem } from './pages/rentable';

const createData = (
  id: number,
  name: string,
  img: string,
  price: number,
  address: string,
  duration: number,
  collateral: number
): RentItem => {
  return {
    id: String(id),
    name,
    img,
    price,
    address,
    duration,
    collateral,
  };
};

const fakeRows = [
  createData(
    1,
    'Frozen yoghurt',
    'https://image.freepik.com/free-vector/close-up-of-cool-cat_36380-133.jpg',
    159,
    '0x9e11119BE78779a7cE912D9cEB698Fb3Ef5A2fB0',
    24,
    4.0
  ),
  createData(
    2,
    'Ice cream sandwich',
    'https://gazeta.a42.ru/uploads/c95/c95b9fe0-133c-11e8-8ba3-c1032bddd647.jpg',
    237,
    '0x9e11119BE78779a7cE912D9cEB698Fb3Ef5A2fB0',
    37,
    4.3
  ),
  createData(
    3,
    'MB VERY LONG TEXT OVER MEGA TEXT',
    'https://pbs.twimg.com/profile_images/1020200269227937792/kuVw5Omh.jpg',
    262,
    '0x9e11119BE78779a7cE912D9cEB698Fb3Ef5A2fB0',
    24,
    6.0
  ),
  createData(
    4,
    'Cupcake',
    'https://cdn22.img.ria.ru/images/134642/33/1346423382_0:206:4147:2558_600x0_80_0_0_1e13f6ed01991f66fccb4e473481570c.jpg',
    1000000,
    '0x9e11119BE78779a7cE912D9cEB698Fb3Ef5A2fB0',
    67,
    4.3
  ),
  createData(
    5,
    'Gingerbread',
    'https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2019-07/cat.jpg?itok=JGbIQ3oL',
    356,
    '0x9e11119BE78779a7cE912D9cEB698Fb3Ef5A2fB0',
    49,
    3.9
  ),
];

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/overview">
        <Box p={6}>
          <Overview />
        </Box>
      </Route>
      <Route path="/rent">
        <Rent rows={fakeRows} />
      </Route>
    </Switch>
  </Router>
);

export default App;
