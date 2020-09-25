import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  sale: {
    position: 'absolute',
    right: '15px',
    top: '25px',
    fontSize: '13px',
    fontWeight: 700,
  },
  minus: { color: 'red' },
  plus: { color: '#4be3b0' },
}));

type CardProcent = {
  procent: number;
  type: string;
};

/**
 * [Создаем процент изменения графика в карточке.]
 *
 * @param {Number} procent [Число, на которое изменилось значение карты (циферки справо:))]
 * @param {String} type    [Тип операции (plus | minus) указывает на то какие стили будут применены к виду проецнта]
 *
 */
const CardProcent: React.FC<CardProcent> = ({ procent, type }) => {
  const classes = useStyles();
  // PLUS TYPE
  if (type === 'plus') {
    return (
      <Typography className={`${classes.sale} ${classes.plus}`}>
        + {procent} %
      </Typography>
    );
  }
  return (
    <Typography className={`${classes.sale} ${classes.minus}`}>
      {' '}
      - {procent} %
    </Typography>
  );
};

export default CardProcent;
