import 'flatpickr/dist/flatpickr.min.css';
import {generatePointsData} from './mocks/points';
import {createFilters} from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';
import StatisticsComponent from './components/statistics';
import ControlsComponent from './components/controls';

const TRIP_POINTS = 4;

const navContainerElement = document.querySelector(`.trip-controls`);
const pointsContainerElement = document.querySelector(`.trip-day`);
const mainElement = document.querySelector(`.main`);
const pageElement = document.querySelector(`body`);

const points = generatePointsData(TRIP_POINTS);
const filters = createFilters();

const filtersComponent = new FiltersComponent(filters);
const pointsComponent = new PointsComponent(points);
const statisticsComponent = new StatisticsComponent(points);
const controlsComponent = new ControlsComponent();


const createFilterFunction = (filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return (point) => point;
    case `filter-future`:
      return (point) => point.time.timeStart > Date.now();
    case `filter-past`:
      return (point) => point.time.End < Date.now();
    default:
      return (point) => point;
  }
};

filtersComponent.onChange = (filterName) => {
  const filteredPoints = points.filter(createFilterFunction(filterName));

  const prevElement = pointsComponent.element;

  pointsComponent.unrender();
  pointsComponent.update(filteredPoints);
  pointsContainerElement.replaceChild(pointsComponent.render(), prevElement);
};


controlsComponent.onClick = (controlName) => {
  if (controlName === `table`) {
    pageElement.removeChild(statisticsComponent.element);
    mainElement.classList.remove(`visually-hidden`);
  }

  if (controlName === `stats`) {
    pageElement.appendChild(statisticsComponent.render());
    mainElement.classList.add(`visually-hidden`);
  }
};

navContainerElement.insertBefore(controlsComponent.render(), navContainerElement.firstChild);
navContainerElement.insertBefore(filtersComponent.render(), navContainerElement.childNodes[1]);
pointsContainerElement.appendChild(pointsComponent.render());

