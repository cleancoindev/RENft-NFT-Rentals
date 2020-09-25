import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

am4core.useTheme(am4themesAnimated);

const useStyles = makeStyles((theme) => ({
  area: {
    maxWidth: '260px',
    display: 'inline-block',
    width: '100%',
    height: '220px',
    padding: '0',
    margin: theme.spacing(1),
    position: 'relative',
    overflow: 'hidden',
  },
  name: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(3),
    textAlign: 'left',
  },
  label: {
    paddingLeft: theme.spacing(2),
    fontWeight: 700,
    textAlign: 'left',
  },
  chart: {
    width: '116%',
    height: '220px',
    position: 'absolute',
    left: '-35px',
    bottom: '-25px',
  },
}));

type Data = {
  date: Date;
  value: number;
};

type CardGraphicProps = {
  id: string;
  name: string;
  color: string;
  startRun: number;
};

/**
 * [Генерируем карточку с графиком. Все передаваемые данные объязательны!!!]
 *
 * @param {String} id [Уникальный идентификатор графика]
 * @param {String} name [Название графика, передано в карточку]
 * @param {String} color [Цвет графика (HEX | RGB | RGBA | TEXT) - прозрачность фона, относительно строки задается автоматически]
 * @param {Number} startRun [Начальное значение графика ]
 *
 */
const CardGraphic: React.FC<CardGraphicProps> = ({
  id,
  name,
  color,
  startRun,
}) => {
  const classes = useStyles();

  const [run, setRun] = useState(startRun);

  /**
   * Комлпексный костыль, чтобы при наведении на график обновлялся только
   * run. А сам грфик не перерисовывался. Увы, но приходится его использовать
   */
  const [chart] = useState(false);

  useEffect(() => {
    const animatedChart = am4core.create(id, am4charts.XYChart);

    // Общие настройки графика
    animatedChart.paddingTop = 80; // Оставляем место сверху, чтобы график не наехал на информацию
    animatedChart.paddingRight = 0;
    animatedChart.paddingLeft = 0;

    animatedChart.width = am4core.percent(110); // Небольшой костыль, чтобы график занял всю ширину карты

    const data: Data[] = []; // Создаём пустой массив в который будем генерирровать значения
    let visits = 10; // Значение value по умлчанию 10 (дальше делится )

    /**
     * Создаём цикл. в котором симулируем данные для отрисовки графика
     * Я думаю. что ты будешь использовать массив время => значения
     *
     * По этому мой пример выглядит именно так Создаём значение и время этого значения
     * Добавляем все это в массив data.
     */
    for (let i = 1; i < 10; i += 1) {
      visits += Math.round((Math.random() < 1 ? 2 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), value: visits });
    }

    animatedChart.data = data; // Передаём наш массив в работу графику

    //  Общие насройки графика
    const dateAxis = animatedChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.disabled = true; // УБираем вертиклаьную сетку
    dateAxis.renderer.labels.template.disabled = true; // Убираем легенду снизу
    //  Настройки данных Values  - настройка данных по значениею
    const valueAxis = animatedChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true; // Убираем общую горизонтальную сетку (да это два разных понятия)
    valueAxis.renderer.baseGrid.disabled = true; // УБираем горизонтальную сетку
    valueAxis.renderer.labels.template.disabled = true; // Убираем легенду сбоку

    // Series - отвечает за настройки самого графика (полоска/ФОН)
    const series = animatedChart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date'; // Поулчить значение даты
    series.dataFields.valueY = 'value'; // Поулчить значение Value

    // Настраиваем прозрачность фона и толщину линии
    series.strokeWidth = 6;
    series.fillOpacity = 0.3;
    series.fill = am4core.color(color);
    series.stroke = am4core.color(color);

    // Переписываем поведение курсора
    animatedChart.cursor = new am4charts.XYCursor();

    //  Разкоментируй, если хочешь скрыть полосочки от курсора
    animatedChart.cursor.lineY.disabled = true;
    animatedChart.cursor.lineX.disabled = true;

    /**
     * Не переноси эту функцию, если не сможешь прокинуть dataAxis
     **********************
     * Обновлеяем значение RUN на текущее положение на графике курсора места графика
     */
    animatedChart.cursor.events.on('cursorpositionchanged', () => {
      const dataItem = dateAxis.getSeriesDataItem(
        series,
        dateAxis.toAxisPosition(animatedChart.cursor.xPosition),
        true
      );
      const { dataContext }: { dataContext: Partial<Data> } = dataItem;
      if ('value' in dataContext) {
        if (typeof dataContext.value === 'number') {
          setRun(dataContext.value);
        }
      }
    });
  }, [chart, color, id]); // Здесь мы говорим что chart не меняется после рендеренга

  return (
    <Paper className={classes.area}>
      <Typography variant="subtitle2" className={classes.name}>
        {name}
      </Typography>
      <Typography variant="h6" id="ladVal" className={classes.label}>
        {run}
      </Typography>

      <div id={id} className={classes.chart} />
    </Paper>
  );
};

export default CardGraphic;
