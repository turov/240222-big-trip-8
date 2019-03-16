import {getRandomInteger, tripFilter, tripContainer, FILTER_PROPS} from './utils';
import createFilter from './create-filter';
import {generatePoint} from './data';
import Point from './point';
import PointEdit from './pointEdit';

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

const renderPoints = (points) => {
  points.forEach((element) => {

    const pointComponent = new Point(element);
    const editPointComponent = new PointEdit(element);

    pointComponent.onEdit = () => {
      editPointComponent.render();
      tripContainer.replaceChild(editPointComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    editPointComponent.onSubmit = () => {
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

// Заполняем контейнер 7-ю событиями
renderPoints(makePoints(4));

// Функция обнуления доски и её заполнения случайным количеством трип поинтов (от 1 до 7)
const fillPoints = () => {
  tripContainer.innerHTML = ``;
  renderPoints(makePoints(getRandomInteger(1, 7)));
};

// Находим в DOM фильтры
const filterLabels = document.body.querySelectorAll(`.trip-filter__item`);

// Навешиваем события клика на каждый фильтр по которому вызывается функция fillPoints
filterLabels.forEach((element) => {
  element.addEventListener(`click`, fillPoints);
});
