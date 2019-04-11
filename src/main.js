import 'flatpickr/dist/flatpickr.min.css';
import {generateRandomInteger} from './lib/random';
import {generatePointsData} from './mocks/points';
import FiltersComponent from './components/filters';
import PointComponent from './components/point';
import PointEditComponent from './components/point-edit';
import {createFilters} from './mocks/filters';

const TRIP_POINTS = 4;
const tripFilterContainer = document.querySelector(`.trip-controls__menus`);
const tripContainer = document.querySelector(`.trip-day__items`);
const mainElement = document.querySelector(`.main`);
const filters = createFilters();

const filtersComponent = new FiltersComponent(filters);
tripFilterContainer.appendChild(filtersComponent.render());

filtersComponent.onChange = (filterId) => {
  console.log(`был выбран фильтр`, filterId);
}

mainElement.appendChild(filtersComponent.render())

const renderPoints = (points) => {
  points.forEach((point, index) => {

    const pointComponent = new PointComponent(point);
    const editPointComponent = new PointEditComponent(point);

    pointComponent.onEdit = () => {
      editPointComponent.render();
      tripContainer.replaceChild(editPointComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    editPointComponent.onSubmit = (newObject) => {
      pointComponent.update(newObject);
      pointComponent.render();
      tripContainer.replaceChild(pointComponent.element, editPointComponent.element);
      editPointComponent.unrender();
    };

    editPointComponent.onDelete = () => {
      editPointComponent.unrender();
      points[index] = null;
    };

    tripContainer.appendChild(pointComponent.render());
  });
};

renderPoints(generatePointsData(TRIP_POINTS));

const fillPoints = () => {
  tripContainer.innerHTML = ``;
  renderPoints(generatePointsData(generateRandomInteger(1, 7)));
};

const filterLabels = document.body.querySelectorAll(`.trip-filter__item`);

filterLabels.forEach((element) => {
  element.addEventListener(`click`, fillPoints);
});
