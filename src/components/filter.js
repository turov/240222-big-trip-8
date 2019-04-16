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
    if (typeof this._onChange === `function`) {
      const filterName = e.target.getAttribute(`id`);
      this._onChange(filterName);
    }
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _addListeners() {
    this._element.querySelector(`input[type="radio"]`).addEventListener(`change`, this._onChange);
  }

  _removeListeners() {
    this._element.querySelector(`input[type="radio"]`).removeEventListener(`change`, this._onChange);
  }
}
