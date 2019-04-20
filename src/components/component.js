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

  rerender(data) {
    const prevElement = this.element;

    this.unrender();
    this.update(data);

    return {
      nextElement: this.render(),
      prevElement
    };
  }

  render() {
    if (!this._state.isRendered) {
      this._element = createElement(this.template);
      this._addListeners();
      this._state.isRendered = true;
    }

    return this._element;
  }

  unrender() {
    if (this._state.isRendered) {
      this._removeListeners();
      this._element = null;

      this._state.isRendered = false;
    }
  }

  update(data) {

    Object.keys(data).filter((prop) => this._data.hasOwnProperty(prop)).forEach((key) => {
      this._data[key] = data[key];
    });
  }
}
