import 'flatpickr/dist/flatpickr.min.css';
import {generatePointsData} from './mocks/points';
import {createFilters} from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';
import StatsComponent from './components/stats';

const TRIP_POINTS = 4;
const STATS_PROPS = [`money`, `transport`, `time-spend`];

const filtersContainerElement = document.querySelector(`.trip-controls__menus`);
const tripDayContainerElement = document.querySelector(`.trip-day`);
const tableButtonElement = document.querySelector(`.view-switch__item:first-child`);
const statsButtonElement = document.querySelector(`.view-switch__item:last-child`);
const mainElement = document.querySelector(`.main`);

const stats = new StatsComponent(STATS_PROPS);
const statsElement = stats.render();
document.body.appendChild(statsElement);

statsButtonElement.onclick = (e) => {
  e.preventDefault();
  statsButtonElement.classList.remove(`view-switch__item--active`);
  tableButtonElement.classList.add(`view-switch__item--active`);
  mainElement.classList.add(`visually-hidden`);
  statsElement.classList.remove(`visually-hidden`);
};

tableButtonElement.onclick = (e) => {
  e.preventDefault();
  tableButtonElement.classList.remove(`view-switch__item--active`);
  statsButtonElement.classList.add(`view-switch__item--active`);
  statsElement.classList.add(`visually-hidden`);
  mainElement.classList.remove(`visually-hidden`);
};

const points = generatePointsData(TRIP_POINTS);
const filters = createFilters();

const filtersComponent = new FiltersComponent(filters);
const pointsComponent = new PointsComponent(points);

filtersComponent.onChange = (filterId) => {
  console.log(`был выбран фильтр`, filterId);
};

pointsComponent.onPointsChange = (updatedPoints) => {

}

filtersContainerElement.appendChild(filtersComponent.render());
tripDayContainerElement.appendChild(pointsComponent.render());
