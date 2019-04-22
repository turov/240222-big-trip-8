import 'flatpickr/dist/flatpickr.min.css';

import filters from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';
import StatisticsComponent from './components/statistics';
import ControlsComponent from './components/controls';
import TotalPriceComponent from './components/total-price';
import API from './services/api';
import ErrorComponent from './components/error';
import LoaderComponent from './components/loader';
import NewEventComponent from './components/new-event';

const AUTHORIZATION = `Basic 240222-big-trip-8`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const ERROR_TIMEOUT = 3000;

const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION
});

const navContainerElement = document.querySelector(`.trip-controls`);
const pointsContainerElement = document.querySelector(`.trip-day`);
const mainElement = document.querySelector(`.main`);
const pageElement = document.querySelector(`body`);
const totalPriceContainerElement = document.querySelector(`.trip`);

const filtersComponent = new FiltersComponent({filters, points: []});
const pointsComponent = new PointsComponent();
const statisticsComponent = new StatisticsComponent();
const controlsComponent = new ControlsComponent();
const totalPriceComponent = new TotalPriceComponent({price: 0});
const errorComponent = new ErrorComponent();
const loaderComponent = new LoaderComponent();
const newEventComponent = new NewEventComponent();

const showErrorComponent = () => {
  const element = errorComponent.render();
  pageElement.appendChild(element);
  setTimeout(() => pageElement.removeChild(element), ERROR_TIMEOUT);
};

const updateFilterComponent = (data) => {
  const {nextElement, prevElement} = filtersComponent.rerender(data);
  navContainerElement.replaceChild(nextElement, prevElement);
};

const updateStatisticsComponent = (data) => {
  const {nextElement, prevElement} = statisticsComponent.rerender(data);
  pageElement.replaceChild(nextElement, prevElement);
};

const updatePointsComponent = (data) => {
  const {nextElement, prevElement} = pointsComponent.rerender(data);
  pointsContainerElement.replaceChild(nextElement, prevElement);
};

const updateTotalPrice = ({points}) => {
  const price = points.reduce((total, point) => total + parseInt(point.price, 10), 0);
  const totalPriceElements = totalPriceComponent.rerender({price});
  totalPriceContainerElement.replaceChild(totalPriceElements.nextElement, totalPriceElements.prevElement);
};

newEventComponent.onClick = () => {
  pointsComponent.showCreatePoint();
};

filtersComponent.onChange = (filterBy) => {
  updatePointsComponent({filterBy});
};

controlsComponent.onClick = (controlName) => {
  if (controlName === `table`) {
    mainElement.classList.remove(`visually-hidden`);
    statisticsComponent.hide();
  }

  if (controlName === `stats`) {
    mainElement.classList.add(`visually-hidden`);
    statisticsComponent.show();
  }
};

pointsComponent.onPointCreated = (points, newPoint, {block, unblock, shake, unshake, sync, reset}) => {
  // @TODO
  // api.createPoint(newPoint)
};

pointsComponent.onPointDeleted = (points, deletedPoint, {block, unblock, shake, unshake, sync, reset}) => {
  block();
  api
    .deletePoint(deletedPoint)
    .then(() => {
      unshake();
      unblock();
      sync();
      updateFilterComponent({points});
      updateTotalPrice({points});
      updatePointsComponent({points});
      updateStatisticsComponent({points});
    })
    .catch(() => {
      shake();
      unblock();
      reset();
      showErrorComponent();
    });
};

pointsComponent.onPointChanged = (points, updatedPoint, {block, unblock, sync, reset}) => {
  block();
  api
    .updatePoint(updatedPoint)
    .then(() => {
      unblock();
      sync();
      updateFilterComponent({points});
      updateTotalPrice({points});
      updatePointsComponent({points});
      updateStatisticsComponent({points});
    })
    .catch(() => {
      unblock();
      reset();
      showErrorComponent();
    });
};

Promise.all([api.getPoints(), api.getDestinations()])
  .then(([points, destinations]) => {
    pageElement.removeChild(loaderComponent.element);
    loaderComponent.unrender();

    updateFilterComponent({points});
    updateTotalPrice({points});
    updatePointsComponent({points, destinations});
    updateStatisticsComponent({points});
  })
  .catch(() => {
    showErrorComponent();
  });

totalPriceContainerElement.appendChild(totalPriceComponent.render());
navContainerElement.insertBefore(controlsComponent.render(), navContainerElement.firstChild);
navContainerElement.insertBefore(filtersComponent.render(), navContainerElement.childNodes[1]);
navContainerElement.appendChild(newEventComponent.render());
pointsContainerElement.appendChild(pointsComponent.render());
pageElement.appendChild(statisticsComponent.render());
pageElement.appendChild(loaderComponent.render());


