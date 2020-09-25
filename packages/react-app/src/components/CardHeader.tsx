import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 1.5),
  },
}));

type CardsHeaderProps = {
  title: string;
};

/**
 * [Тут у нас лежит универсальное название карточки, его можно использвоать
 * как в самой карте, так и отдельно (отступы и подчеркивание закреплены здесь)]
 *
 * @param {Array} props [Масив данных принимаемый от родителей]
 * @param {String} props.title [Передаем заголовок карточки ]
 *
 */
const CardsHeader: React.FC<CardsHeaderProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h1" color="textSecondary" className={classes.header}>
        {title}
      </Typography>
      <Divider />
    </>
  );
};

export default CardsHeader;
