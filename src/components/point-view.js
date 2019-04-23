import Component from './component';
import {createPointTemplate} from '../templates/point-view-template';

const defaultData = {point: {}};

export default class PointView extends Component {
  constructor(data = defaultData) {
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
    this._element.addEventListener(`click`, this._onClick);
  }

  _removeListeners() {
    this._element.removeEventListener(`click`, this._onClick);
  }

  update(data) {
    this._data = data;
  }
}
