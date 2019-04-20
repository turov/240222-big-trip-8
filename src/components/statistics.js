import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import Component from './component';
import {createStatisticsTemplate} from '../templates/statistics-template';

const STATS_NAMES = [
  `money`,
  `transport`,
  `time-spend`
];

const BAR_HEIGHT = 300;

const createChartOptions = (option, color, formatFirst, formatSecond) => (
  {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => (formatFirst + `${val}` + formatSecond)
      }
    },
    title: {
      display: true,
      text: option,
      fontColor: color,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
);

const createChartData = (labels, data) => {
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  };
};

export default class StatisticsComponent extends Component {
  constructor(data = {points: []}) {
    super(data);
  }

  get template() {
    return createStatisticsTemplate(STATS_NAMES);
  }

  calculateData() {
    return this._data.points.reduce((accumulator, point) => {
      accumulator.times.push(moment(point.time.timeEnd - point.time.timeStart).format(`h`));
      accumulator.prices.push(point.price);
      accumulator.types.push(point.type);

      return accumulator;
    }, {
      prices: [],
      types: [],
      times: []
    });
  }

  render() {
    const element = super.render();
    const {types, prices, times} = this.calculateData();

    const moneyCtx = element.querySelector(`.statistic__money`);
    const transportCtx = element.querySelector(`.statistic__transport`);
    const timeCtx = element.querySelector(`.statistic__time-spend`);

    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeCtx.height = BAR_HEIGHT * 4;

    this.moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: createChartData(types, prices),
      options: createChartOptions(`MONEY`, `#1498A3`, `€ `, ``)
    });

    this.transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: createChartData(types, times),
      options: createChartOptions(`TRANSPORT`, `#BDDDFF`, ``, ` hours`)
    });

    return element;
  }

  unrender() {
    this.moneyChart.destroy();
    this.transportChart.destroy();

    super.unrender();
  }
}
