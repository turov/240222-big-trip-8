import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import Component from './component';
import {createStatisticsTemplate} from '../templates/statisticsTemplate';

const STATS_NAMES = [
  `money`,
  `transport`,
  `time-spend`
];
const createChartOptions = (option, color, formatFirst, formatSecond) => {
  const chartOptions = {
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
  };
  return chartOptions;
};

export default class StatisticsComponent extends Component {
  get template() {
    return createStatisticsTemplate(STATS_NAMES);
  }

  calculateData() {
    const Data = {
      prices: [],
      types: [],
      times: []
    };
    this._data.forEach((point) => {
      Data.prices.push(point.price);
      Data.types.push(point.type);
      Data.times.push(moment(point.time.timeEnd - point.time.timeStart).format(`h`));
    });
    return Data;
  }

  render() {
    const element = super.render();

    const moneyCtx = element.querySelector(`.statistic__money`);
    const transportCtx = element.querySelector(`.statistic__transport`);
    const timeCtx = element.querySelector(`.statistic__time-spend`);
    const BAR_HEIGHT = 55;

    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeCtx.height = BAR_HEIGHT * 4;

    this.moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this.calculateData().types,
        datasets: [{
          data: this.calculateData().prices,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: createChartOptions(`MONEY`, `#1498A3`, `€ `, ``)
    });

    this.transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this.calculateData().types,
        datasets: [{
          data: this.calculateData().times,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
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
