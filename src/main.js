import {getRandomInteger, tripFilter, tripContainer, FILTER_PROPS} from './utils';
import createFilter from './create-filter';
import createTripPoint from './create-trip-point';
import {generatePoint} from './data';

// Запускаем цикл рендера фильтров
FILTER_PROPS.forEach((element) => {
  const filter = createFilter(element.value, element.checked, element.disabled);
  tripFilter.appendChild(filter);
});


// Функция генерации массива с данными
const makePoints = (count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push(generatePoint());
  }
  return points;
};

// Функция создания карточек по данным
const fillTripContainer = (points) => {
  points.forEach((element)=>{
    tripContainer.appendChild(createTripPoint(element));
  });
};

// Заполняем контейнер 7-ю событиями
fillTripContainer(makePoints(4));

// Функция обнуления доски и её заполнения случайным количеством трип поинтов (от 1 до 7)
const fillPoints = () => {
  tripContainer.innerHTML = ``;
  fillTripContainer(makePoints(getRandomInteger(1, 7)));
};

// Находим в DOM фильтры
const filterLabels = document.body.querySelectorAll(`.trip-filter__item`);

// Навешиваем события клика на каждый фильтр по которому вызывается функция fillPoints
filterLabels.forEach((element) => {
  element.addEventListener(`click`, fillPoints);
});
