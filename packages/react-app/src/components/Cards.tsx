import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import CardHeader from './CardHeader';
import CardSlider from './CardSlider';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: '220px',
    margin: theme.spacing(0),
    padding: theme.spacing(0), // Обнуляем внутренние отступы
  },
}));

type SimpleCardsProps = {
  cont: React.ReactChild;
  title: string;
  slider: boolean;
};

/**
 * [Создаём универсальную область в которую загружаем контент страниц
 * Для этого настраиваем одинкаовые отступы (margin, padding) и единый стиль области]
 *
 * @param {Array} props [Масив данных принимаемый от родителей]
 * @param {*} props.title [Название карточки]
 * @param {*} props.cont [Контент загружаемый в карточку товара]
 * @param {*} props.slider [Управлем статусом слайдера карты (показать / скрыть)]
 *
 */
const SimpleCards: React.FC<SimpleCardsProps> = ({ cont, title, slider }) => {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={3} className={classes.card}>
        <CardHeader title={title} />
        {cont}
      </Paper>

      {slider && <CardSlider />}
    </Container>
  );
};

export default SimpleCards;
