import Component from './component';
import {createPointTemplate} from '../templates/points';

export default class Point extends Component {
  constructor(data) {
    super(data);

    this._onEdit = null;
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    e.preventDefault();
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return createPointTemplate(this._data);
  }

  _addListeners() {
    this._element.querySelector(`.trip-icon`).addEventListener(`click`, this._onClick);
  }

  _removeListeners() {
    this._element.querySelector(`.trip-icon`).removeEventListener(`click`, this._onClick);
  }

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data._description;
  }
}
