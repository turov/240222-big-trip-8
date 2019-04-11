import Component from './component';
import {createFilterTemplate} from '../templates/create-filter';

export default class FilterComponent extends Component {
  constructor(data) {
    super(data);

    this._onClick = this._onClick.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  _onClick(e) {
    e.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
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
