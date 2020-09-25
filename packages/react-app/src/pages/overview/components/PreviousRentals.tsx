import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

type PreviousRentalsProps = {
  children: React.ReactNode[];
};

const PreviousRentals: React.FC<PreviousRentalsProps> = ({ children }) => {
  return (
    <Card>
      <CardHeader subheader="Previous Rentals" />
      <Divider />

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default PreviousRentals;
