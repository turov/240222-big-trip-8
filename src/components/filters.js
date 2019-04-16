import Filter from './filter';
import Component from './component';

export default class FiltersComponent extends Component {

  constructor(data) {
    super(data);
    this._filterComponents = [];
  }

  get template() {
    return `<form class="trip-filter"></form>`;
  }

  set onChange(fn) {
    this._changeCallback = fn;
  }

  render() {
    const element = super.render();

    this._filterComponents = this._data.filters.map((filterData) => new Filter(filterData));

    this._filterComponents.forEach((filterComponent) => {
      filterComponent.onChange = (filterName) => {
        if (typeof this._changeCallback === `function`) {
          this._changeCallback(filterName);
        }
      };

      element.appendChild(filterComponent.render());
    });

    return element;
  }

  unrender() {
    this._filterComponents.forEach((filterComponent) => {
      element.removeChild(filterComponent.element);
      filterComponent.unrender();
    });

    this._filterComponents = null;

    super.unrender();
  }

}
