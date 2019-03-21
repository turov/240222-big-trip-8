import Component from './component';

export default class Point extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._title = data.type;
    this._city = data.city;
    this._picture = data.picture;
    this._offers = data.offers;
    this._time = data.time;
    this._price = data.price;

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

  _addListeners() {
    this._element.querySelector(`.trip-icon`).addEventListener(`click`, this._onClick);
  }

  _removeListeners() {
    this._element.querySelector(`.trip-icon`).removeEventListener(`click`, this._onClick);
  }
}
