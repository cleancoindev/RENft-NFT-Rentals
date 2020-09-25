import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import IconFull from '@material-ui/icons/Fullscreen';

import CardProcent from './CardProcent';
import CardContent from './CardContent';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2, 1),
    padding: theme.spacing(1.2, 1),
    maxWidth: 260,
    width: '100%',
    display: 'inline-flex',
    position: 'relative',
  },
  iconArea: {
    width: '48px',
    height: '48px',
    margin: theme.spacing(0.2),
    borderRadius: '7px',
    display: 'flex',
    backgroundColor: '#dafaef',
    color: '#4be3b0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '35px',
    height: '35px',
  },
  green: {
    backgroundColor: '#81c784',
  },
}));

type CardInfoGreenProps = {
  name: string;
  run: number;
  procent: number;
  type: string;
};

/**
 * [К сожлаению мне не удалось достичь качественного изменения цвета в карточке
 * По этому я просто её размножил( Извини)]
 *
 * @param {String} name [Название карточки - передаётся дальше в CardContent]
 * @param {Number} run  [Значение карточки - передаётся дальше в CardContent]
 * @param {Number} procent [На сколько процентов изменилось значение  - передаётся дальше в CardSale]
 * @param {String} type [Тип изменения процента (plus | minus) ]
 */
const CardInfoGreen: React.FC<CardInfoGreenProps> = ({
  name,
  run,
  procent,
  type,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card}>
      <Box className={`${classes.iconArea} ${classes.green}`}>
        <IconFull className={classes.icon} />
      </Box>

      <CardContent name={name} run={run} />

      <CardProcent procent={procent} type={type} />
    </Paper>
  );
};

export default CardInfoGreen;
