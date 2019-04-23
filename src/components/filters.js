import Filter from './filter';
import Component from './component';

const defaultData = {filter: {}, points: []};

export default class Filters extends Component {
  constructor(data = defaultData) {
    super(data);
    this._filterComponents = [];
  }

  get template() {
    return `<form class="trip-filter"></form>`;
  }

  set onChange(fn) {
    this._changeCallback = fn;
  }

  update(data) {
    super.update(data)
    const {filters, points} = this._data;

    if (this._filterComponents) {
      this._filterComponents.forEach((component, index) => {
        component.update({
          filter: filters[index],
          points
        });
      });
    }
  }

  render() {
    const element = super.render();
    const {filters, points} = this._data;

    this._filterComponents = filters.map((filter) => new Filter({filter, points}));

    this._filterComponents.forEach((filterComponent) => {
      filterComponent.onChange = (filterBy) => {
        if (typeof this._changeCallback === `function`) {
          this._changeCallback(filterBy);
        }
      };

      element.appendChild(filterComponent.render());
    });

    return element;
  }

  unrender() {
    this._filterComponents.forEach((filterComponent) => {
      this.element.removeChild(filterComponent.element);
      filterComponent.unrender();
    });

    this._filterComponents = null;

    super.unrender();
  }
}
