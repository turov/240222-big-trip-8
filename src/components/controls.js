import Component from './component';
import {createViewSwitchTemplate} from '../templates/controls-template';

export default class ControlsСomponent extends Component {
  constructor(data) {
    super(data);

    this._onClick = this._onClick.bind(this);
  }

  get template() {
    return createViewSwitchTemplate();
  }

  _onClick(e) {
    e.preventDefault();
    this.element.querySelector(`.view-switch__item:last-child`).classList.toggle(`view-switch__item--active`);
    this.element.querySelector(`.view-switch__item:first-child`).classList.toggle(`view-switch__item--active`);
    if (typeof this._clickCallback === `function`) {
      e.target.getAttribute(`data-name`);
      const controlName = e.target.getAttribute(`data-name`);
      this._clickCallback(controlName);
    }
  }

  set onClick(fn) {
    this._clickCallback = fn;
  }

  _addListeners() {
    this.element.querySelector(`.view-switch__item:last-child`).addEventListener(`click`, this._onClick);
    this.element.querySelector(`.view-switch__item:first-child`).addEventListener(`click`, this._onClick);
  }

  _removeListeners() {
    this.element.querySelector(`.view-switch__item:last-child`).removeEventListener(`click`, this._onClick);
    this.element.querySelector(`.view-switch__item:first-child`).addEventListener(`click`, this._onClick);
  }

}

