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
    this._onChange = fn;
  }

  render() {
    const element = super.render();

    this._filterComponents = this._data.map((filterData) => new Filter(filterData));

    this._filterComponents.forEach((filterComponent) => {
      filterComponent.render();
      filterComponent.onChange = (filterName) => {
        if (typeof this._onChange === `function`) {
          this._onChange(filterName);
        }
      };

      element.appendChild(filterComponent.render());
    });

    return element;
  }

  unrender() {
    this._filterComponents.forEach((filterComponent) => {
      filterComponent.unrender();
    });

    this._Filtercomponents = null;

    super.unrender();
  }

}
