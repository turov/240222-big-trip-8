const TRIP_POINTS = 4;
const tripFilter = document.querySelector(`.trip-filter`);
const tripContainer = document.querySelector(`.trip-day__items`);

import {FILTER_PROPS} from './lib/constans';
import {generateRandomInteger} from './lib/random';
import {generatePointsData} from './mocks/points';

import createFilter from './templates/create-filter';

import PointComponent from './components/point';
import PointEditComponent from './components/point-edit';

// Запускаем цикл рендера фильтров
FILTER_PROPS.forEach((element) => {
  tripFilter.appendChild(createFilter(element.value, element.checked, element.disabled));
});

const renderPoints = (points) => {
  points.forEach((element) => {

    const pointComponent = new PointComponent(element);
    const editPointComponent = new PointEditComponent(element);

    pointComponent.onEdit = () => {
      editPointComponent.render();
      tripContainer.replaceChild(editPointComponent.element, pointComponent.element);
      pointComponent.unrender();
    };
    
    editPointComponent.onSubmit = (newObject) => {
      element.title = newObject.title;
      element.offers = newObject.offers;
      element.city = newObject.city;
      element.type = newObject.type;
      element.time = newObject.time;
      element.price = newObject.price;

      pointComponent.update(element);
      pointComponent.render();
      tripContainer.replaceChild(pointComponent.element, editPointComponent.element);
      editPointComponent.unrender();
    };

    editPointComponent.onReset = () => {
      pointComponent.render();
      tripContainer.replaceChild(pointComponent.element, editPointComponent.element);
      editPointComponent.unrender();
    };

    tripContainer.appendChild(pointComponent.render());
  });
};

// Функция создания карточек по данным
// const fillTripContainer = (points) => {
//   points.forEach((element)=>{
//     tripContainer.appendChild(createTripPoint(element));
//   });
// };

// Заполняем контейнер 4-ю событиями
renderPoints(generatePointsData(TRIP_POINTS));
// Функция обнуления доски и её заполнения случайным количеством трип поинтов (от 1 до 7)
const fillPoints = () => {
  tripContainer.innerHTML = ``;
  renderPoints(generatePointsData(generateRandomInteger(1, 7)));
};

// Находим в DOM фильтры
const filterLabels = document.body.querySelectorAll(`.trip-filter__item`);

// Навешиваем события клика на каждый фильтр по которому вызывается функция fillPoints
filterLabels.forEach((element) => {
  element.addEventListener(`click`, fillPoints);
});
