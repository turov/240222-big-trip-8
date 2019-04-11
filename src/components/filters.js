import Filter from './filter';
import Component from './component';
import {createFiltersTemplate} from '../templates/filters';

export default class FiltersComponent extends Component {

  constructor(data) {
    super(data);

    this.components = null;
    this._onChange = null;
  }

  get template() {
    return createFiltersTemplate(this._data);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  render() {
    const element = super.render();

    this.components = this._data.map((filterData) => {
      const component = new Filter(filterData);

      element.appendChild(component.render());

      component.onSelect = (filterId) => {
        if (typeof this._onChange === `function`) {
          this._onChange(filterId);
        }
      };

      return component;
    });

    return element;
  }

  unrender() {
    this.components.forEach((component) => {
      this.element.removeChild(component.element);
      component.unrender();
    });

    this.components = null;

    super.unrender();
  }

}
