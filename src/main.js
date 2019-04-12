import 'flatpickr/dist/flatpickr.min.css';
import {generatePointsData} from './mocks/points';
import {createFilters} from './mocks/filters';
import FiltersComponent from './components/filters';
import PointsComponent from './components/points';

const TRIP_POINTS = 4;

const filtersContainerElement = document.querySelector(`.trip-controls__menus`);
const tripDayContainerElement = document.querySelector(`.trip-day`);

const points = generatePointsData(TRIP_POINTS);
const filters = createFilters();

const filtersComponent = new FiltersComponent(filters);
const pointsComponent = new PointsComponent(points);

filtersComponent.onChange = (filterId) => {
  console.log(`был выбран фильтр`, filterId);
};

pointsComponent.onPointsChange = (updatedPoints) => {

}

filtersContainerElement.appendChild(filtersComponent.render());
tripDayContainerElement.appendChild(pointsComponent.render());
