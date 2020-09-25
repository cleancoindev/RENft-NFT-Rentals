import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import Button, { ButtonProps } from './Button';

const useStyles = makeStyles(() => ({
  app: { boxShadow: 'none' },
  title: {
    flexGrow: 1,
  },
}));

type NavBarProps = {
  buttonsList?: ButtonProps[];
};

const NavBar: React.FC<NavBarProps> = ({ buttonsList }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.app} position="static" color="transparent">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h3">reNFT</Typography>
          {buttonsList &&
            buttonsList.map((btn) => (
              <Button key={btn.label} label={btn.label} variant={btn.variant} />
            ))}
        </Toolbar>

        <Divider />
      </Container>
    </AppBar>
  );
};

export default NavBar;
