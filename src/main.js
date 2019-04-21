import 'flatpickr/dist/flatpickr.min.css';

import {createFilters} from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';
import StatisticsComponent from './components/statistics';
import ControlsComponent from './components/controls';
import TotalPriceComponent from './components/total-price';
import API from './services/api';
import ErrorComponent from './components/error';

// 1) После внесения изменений итоговая стоимость путешествия пересчитывается.
// 2) 1.4 Фильтры
// 3) Если во время загрузки произошла ошибка, покажите сообщение: «Something went wrong while loading your route info. Check your connection or try again later».
// ------
// 4) Для просмотра статистики пользователь нажимает на кнопку «Stats». После этого для элемента main добавляется класс visually-hidden, а для элемента .statistic, наоборот, сбрасывается .visually-hidden.
// ------
// 5) Пользователь может добавить точку маршрута в избранное. Добавление в избранное осуществляется с помощью кнопки .point__favorite.
// 6) форматирование даты

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
const totalPriceContainerElement = document.querySelector(`.trip`);

const filtersComponent = new FiltersComponent({filters: createFilters()});
const pointsComponent = new PointsComponent();
const statisticsComponent = new StatisticsComponent();
const controlsComponent = new ControlsComponent();
const totalPriceComponent = new TotalPriceComponent({price: 0});
const errorComponent = new ErrorComponent();

const updateStatisticsComponent = (points) => {
  if (statisticsComponent.element) {
    const {nextElement, prevElement} = statisticsComponent.rerender({points});
    pageElement.appendChild(nextElement, prevElement);
  } else {
    statisticsComponent.update({points});
  }
};

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

pointsComponent.onPointDeleted = (points, deletedPoint) => {
  api
    .deletePoint(deletedPoint)
    .then(() => updateStatisticsComponent(points));
};


pointsComponent.onPointChanged = (points, updatedPoint) => {
  api
    .updatePoint(updatedPoint)
    .then(() => updateStatisticsComponent(points));

  const price = points.reduce((total, point) => {
    return total + ++point.price;
  }, 0);

  const totalPriceElements = totalPriceComponent.rerender({price});
  totalPriceContainerElement.replaceChild(totalPriceElements.nextElement, totalPriceElements.prevElement);
};

api.getPoints()
  .then((points) => {
    const price = points.reduce((total, point) => {
      return total + point.price;
    }, 0);

    const totalPriceElements = totalPriceComponent.rerender({price});
    totalPriceContainerElement.replaceChild(totalPriceElements.nextElement, totalPriceElements.prevElement);

    const pointsElements = pointsComponent.rerender({points});
    pointsContainerElement.replaceChild(pointsElements.nextElement, pointsElements.prevElement);
    statisticsComponent.update({points});
  })
  .catch(() => {
    pageElement.appendChild(errorComponent.render());
  });

totalPriceContainerElement.appendChild(totalPriceComponent.render());
navContainerElement.insertBefore(controlsComponent.render(), navContainerElement.firstChild);
navContainerElement.insertBefore(filtersComponent.render(), navContainerElement.childNodes[1]);
pointsContainerElement.appendChild(pointsComponent.render());
