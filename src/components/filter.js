import Component from './component';
import {createFilterTemplate} from '../templates/filters-template';

export default class Filter extends Component {
  constructor(data) {
    super(data);

    this._onChange = this._onChange.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  _onChange(e) {
    e.preventDefault();
    if (typeof this._onFilter === `function`) {
      const filterId = e.target.getAttribute(`data-filter-id`);
      this._onSelect(filterId);
    }
  }

  set onSelect(fn) {
    this._onSelect = fn;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }


  _addListeners() {
    this._element.querySelector(`.trip-filter__item`).addEventListener(`click`, this._onClick);
  }

  _removeListeners() {
    this._element.querySelector(`.trip-filter__item`).removeEventListener(`click`, this._onClick);
  }
}
