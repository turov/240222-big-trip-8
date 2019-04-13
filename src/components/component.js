import createElement from '../lib/create-element';
import cloneDeep from 'lodash.clonedeep';

export default class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
    this._data = cloneDeep(data);
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  _addListeners() {}

  _removeListeners() {}

  render() {
    this._element = createElement(this.template);
    this._addListeners();
    return this._element;
  }

  unrender() {
    this._removeListeners();
    this._element.remove();
    this._element = null;
  }


  update(data) {
    Object.keys(data).filter((prop) => this._data.hasOwnProperty(prop)).forEach((key) => {
      this._data[key] = data[key];
    });
  }
}
