import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';

import { ButtonVariant } from '../types';

const useStyles = makeStyles(() => ({
  btnStyle: { marginRight: '5px' },
}));

export type ButtonProps = {
  variant: ButtonVariant;
  label: string;
};

const Button: React.FC<ButtonProps> = ({ variant, label }) => {
  const classes = useStyles();

  return (
    <MaterialButton
      variant={variant}
      size="medium"
      className={classes.btnStyle}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
