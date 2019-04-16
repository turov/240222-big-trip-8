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
    if (typeof this._changeCallback === `function`) {
      this._changeCallback(e.target.getAttribute(`value`));
    }
  }

  set onChange(fn) {
    this._changeCallback = fn;
  }

  _addListeners() {
    this._element.querySelector(`input[type="radio"]`).addEventListener(`change`, this._onChange);
  }

  _removeListeners() {
    this._element.querySelector(`input[type="radio"]`).removeEventListener(`change`, this._onChange);
  }
}
