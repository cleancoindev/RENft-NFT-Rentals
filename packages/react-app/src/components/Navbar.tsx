import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import Button, { ButtonProps } from './Button';

const useStyles = makeStyles((theme) => ({
  app: { boxShadow: 'none' },
  title: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
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
          <Typography variant="body1" className={classes.title}>
            reNFT
          </Typography>
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
