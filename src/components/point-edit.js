import Component from './component';
import {createPointEditTemplate} from '../templates/point-edit-template';
import flatpickr from 'flatpickr';
import {TYPES} from '../mocks/points';

export default class PointEditComponent extends Component {
  constructor(data) {
    super(data);

    this._state.isFavorite = false;

    this._onSubmit = null;
    this._onDelete = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
  }

  static createMapper(target) {
    return {
      offer: (value) => target.offers.push(value),
      destination: (value) => (target.city = value),
      timeStart: (value) => (target.time.timeStart = value),
      timeEnd: (value) => (target.time.timeEnd = value),
      price: (value) => (target.price = value),
      travelway: (value) => (target.type = TYPES[value]),
      favorite: (checked) => (target.isFavorite = checked)
    };
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

  _onDeleteButtonClick(e) {
    e.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
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

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return createPointEditTemplate(this._data);
  }

  _addListeners() {
    this._pointForm = this._element.querySelector(`.point form`);
    this._pointDelete = this._element.querySelector(`.point__button[type="reset"]`);
    this._pointFavorite = this._element.querySelector(`.point__favorite`);
    this._pointForm.addEventListener(`submit`, this._onSubmitButtonClick);
    this._pointDelete.addEventListener(`click`, this._onDeleteButtonClick);
    this._pointFavorite.addEventListener(`click`, this._onChangeFavorite);
  }

  _removeListeners() {
    this._pointForm .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._pointDelete.removeEventListener(`click`, this._onDeleteButtonClick);
    this._pointFavorite .removeEventListener(`click`, this._onChangeFavorite);
    this._pointForm = null;
    this._pointFavorite = null;
  }

  render() {
    super.render();

    this._timeStartWidget = flatpickr(this._element.querySelector(`.point__input--time-start`), {
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
    });

    this._timeEndWidget = flatpickr(this._element.querySelector(`.point__input--time-end`), {
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
    });
  }

  unrender() {
    if (this._timeStartWidget) {
      this._timeStartWidget.destroy();
      this._timeStartWidget = null;
    }

    if (this._timeEndWidget) {
      this._timeEndWidget.destroy();
      this._timeEndWidget = null;
    }

    super.unrender();
  }

}
