import {createElement} from './create-element';

export default class Point {
  constructor(data) {
    this._type = data.type;
    this._title = data.type;
    this._city = data.city;
    this._picture = data.picture;
    this._offers = data.offers;
    this._time = data.time;
    this._price = data.price;

    this._element = null;
    this._state = {
      // isEdit = false
    };

    this._onEdit = null;
  }

  _onClick(e) {
    e.preventDefault();
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="trip-point">
    <i class="trip-icon">${this._type}</i>
    <h3 class="trip-point__title">${this._city}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${this._time}</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    <ul class="trip-point__offers">
      ${this._offers.map((element) => {
    return `<li>
        <button class="trip-point__offer">${element} +&euro;&nbsp;20</button>
      </li>`;
  }).join(``)}
    </ul>
    </article>`.trim();
  }

  bind() {
    this._tripIcon = this._element.querySelector(`.trip-icon`);
    this._onClickBound = this._onClick.bind(this);
    this._tripIcon.addEventListener(`click`, this._onClickBound);
  }

  unbind() {
    this._tripIcon.removeEventListener(`click`, this._onClickBound);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
