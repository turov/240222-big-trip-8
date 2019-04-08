import Component from './component';
import {createPointEditTemplate} from '../templates/pointsEdit';
import flatpickr from 'flatpickr';
import {TYPES} from '../mocks/points';

export default class PointEditComponent extends Component {
  constructor(data) {
    super(data);

    this._state.isFavorite = false;

    this._onSubmit = null;
    this._onReset = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);

    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
  }

  _processForm(formData) {
    const entry = {
      type: ``,
      description: this._data.description,
      city: ``,
      offers: [],
      time: new Date(),
      price: ``
    };

    const pointEditMapper = PointEditComponent.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(e) {
    e.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function` && this._onSubmit(newData)) {
      this._onSubmit();
    }
    this.update(newData);
  }

  _onResetButtonClick(e) {
    e.preventDefault();
    if (typeof this._onReset === `function`) {
      this._onReset();
    }
  }

  _onChangeTime() {
    this._removeListeners();
    this._partialUpdate();
    this._addListeners();
  }

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  get template() {
    return createPointEditTemplate(this._data);
  }

  _addListeners() {
    this._pointForm = this._element.querySelector(`.point form`);
    this._pointFavorite = this._element.querySelector(`.point__favorite`);
    this._pointForm.addEventListener(`submit`, this._onSubmitButtonClick);
    this._pointForm.addEventListener(`reset`, this._onResetButtonClick);
    this._pointFavorite.addEventListener(`click`, this._onChangeFavorite);
  }

  _removeListeners() {
    this._pointForm .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._pointForm .removeEventListener(`reset`, this._onResetButtonClick);
    this._pointFavorite .removeEventListener(`click`, this._onChangeFavorite);
    this._pointForm = null;
    this._pointFavorite = null;
  }

  render() {
    super.render();

    this._time = flatpickr(this._element.querySelector(`.point__time input`), {
      mode: `range`,
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `H:i`,
      conjunction: ` - `
    });
  }

  unrender() {
    this._time.destroy();
    this._time = null;

    super.unrender();
  }

  static createMapper(target) {
    return {
      offer: (value) => target.offers.push(value),
      destination: (value) => (target.city = value),
      time: (value) => (target.time = value),
      price: (value) => (target.price = value),
      travelway: (value) => (target.type = TYPES[value])
    };
  }

}
