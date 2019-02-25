import {getRandomInteger, tripFilter, tripContainer, FILTER_PROPS} from './utils';
import createFilter from './create-filter';
import createTripPoint from './create-trip-point';

// Запускаем цикл рендера фильтров
FILTER_PROPS.forEach((element) => {
  const filter = createFilter(element.value, element.checked, element.disabled);
  tripFilter.appendChild(filter);
});

// Функция заполнения точками путешествия
function fillTripContaier(count) {
  for (let i = 0; i < count; i++) {
    const point = createTripPoint();
    tripContainer.appendChild(point);
  }
}

// Заполняем контейнер 7-ю событиями
fillTripContaier(7);

// Функция обнуления доски и её заполнения случайным количеством трип поинтов (от 1 до 7)
function generatePoints() {
  tripContainer.innerHTML = ``;
  fillTripContaier(getRandomInteger(1, 7));
}

// Находим в DOM фильтры
const filterLabels = document.body.querySelectorAll(`.trip-filter__item`);

// Навешиваем события клика на каждый фильтр по которому вызывается функция generatePoints
filterLabels.forEach((element) => {
  element.addEventListener(`click`, generatePoints);
});
