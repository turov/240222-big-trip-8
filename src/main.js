import 'flatpickr/dist/flatpickr.min.css';

import {generatePointsData} from './mocks/points';
import {createFilters} from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';
import StatisticsComponent from './components/statistics';
import ControlsComponent from './components/controls';
import API from './lib/api';

const AUTHORIZATION = `Basic 240222-big-trip-8`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const TRIP_POINTS = 4;

const navContainerElement = document.querySelector(`.trip-controls`);
const pointsContainerElement = document.querySelector(`.trip-day`);
const mainElement = document.querySelector(`.main`);
const pageElement = document.querySelector(`body`);

let points = generatePointsData(TRIP_POINTS);
console.log(points);
const filters = createFilters();

const filtersComponent = new FiltersComponent({filters});
const pointsComponent = new PointsComponent({points});
const statisticsComponent = new StatisticsComponent({points});
const controlsComponent = new ControlsComponent();

const createFilterFunction = (filterName) => {
  switch (filterName) {
    case `future`:
      return (point) => point.time.timeStart > Date.now();
    case `past`:
      return (point) => point.time.End < Date.now();
    default:
      return (point) => point;
  }
};

filtersComponent.onChange = (filterName) => {
  const filteredPoints = points.filter(createFilterFunction(filterName));
  const prevElement = pointsComponent.element;

  pointsComponent.unrender();
  pointsComponent.update({
    points: filteredPoints
  });

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

pointsComponent.onPointsChanged = (updatedPoints) => {
  points = updatedPoints;

  if (statisticsComponent.element) {
    const prevElement = statisticsComponent.element;
    statisticsComponent.unrender();
    statisticsComponent.update({
      points: updatedPoints
    });
    pageElement.appendChild(statisticsComponent.render(), prevElement);
  } else {
    statisticsComponent.update({
      points: updatedPoints
    });
  }
};

navContainerElement.insertBefore(controlsComponent.render(), navContainerElement.firstChild);
navContainerElement.insertBefore(filtersComponent.render(), navContainerElement.childNodes[1]);
pointsContainerElement.appendChild(pointsComponent.render());

api.getPoints()
  .then((points) => {
    console.log(points[0]);
  });
