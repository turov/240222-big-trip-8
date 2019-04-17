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
    this.statsBtnElement.classList.toggle(`view-switch__item--active`);
    this.pointsBtnElement.classList.toggle(`view-switch__item--active`);

    if (typeof this._clickCallback === `function`) {
      this._clickCallback(e.target.getAttribute(`data-name`));
    }
  }

  set onClick(fn) {
    this._clickCallback = fn;
  }

  _addListeners() {
    this.statsBtnElement = this.element.querySelector(`.view-switch__item:last-child`);
    this.pointsBtnElement = this.element.querySelector(`.view-switch__item:first-child`);

    this.statsBtnElement.addEventListener(`click`, this._onClick);
    this.pointsBtnElement.addEventListener(`click`, this._onClick);
  }

  _removeListeners() {
    this.statsBtnElement.removeEventListener(`click`, this._onClick);
    this.pointsBtnElement.addEventListener(`click`, this._onClick);

    this.statsBtnElement = null;
    this.pointsBtnElement = null;
  }
}

