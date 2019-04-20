import 'flatpickr/dist/flatpickr.min.css';

import {createFilters} from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';
import StatisticsComponent from './components/statistics';
import ControlsComponent from './components/controls';
import API from './services/api';

const AUTHORIZATION = `Basic 240222-big-trip-8`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION
});

const navContainerElement = document.querySelector(`.trip-controls`);
const pointsContainerElement = document.querySelector(`.trip-day`);
const mainElement = document.querySelector(`.main`);
const pageElement = document.querySelector(`body`);

const filtersComponent = new FiltersComponent({filters: createFilters()});
const pointsComponent = new PointsComponent();
const statisticsComponent = new StatisticsComponent();
const controlsComponent = new ControlsComponent();

// @TODO: move
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
  const points = points.filter(createFilterFunction(filterName));
  const {nextElement, prevElement} = pointsComponent.rerender({points});

  pointsContainerElement.replaceChild(nextElement, prevElement);
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

pointsComponent.onPointsChanged = (allPoints, updatedPoint) => {
  api
    .updatePoint(updatedPoint)
    .then(() => {
      if (statisticsComponent.element) {
        const {nextElement, prevElement} = statisticsComponent.rerender({
          points: allPoints
        });
        pageElement.appendChild(nextElement, prevElement);
      } else {
        statisticsComponent.update({
          points: allPoints
        });
      }
    });
};

api.getPoints()
  .then((points) => {
    console.log(points);
    const {nextElement, prevElement} = pointsComponent.rerender({points});
    pointsContainerElement.replaceChild(nextElement, prevElement);
    statisticsComponent.update({points});
  })
  .catch((error) => {
    // @TODO: error
  });

navContainerElement.insertBefore(controlsComponent.render(), navContainerElement.firstChild);
navContainerElement.insertBefore(filtersComponent.render(), navContainerElement.childNodes[1]);
pointsContainerElement.appendChild(pointsComponent.render());
