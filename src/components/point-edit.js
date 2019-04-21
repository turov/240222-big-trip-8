import cloneDeep from 'lodash.clonedeep';
import flatpickr from 'flatpickr';
import moment from 'moment';
import Component from './component';
import {createPointEditTemplate} from '../templates/point-edit-template';
import {TYPES} from '../mocks/points';

export default class PointEditComponent extends Component {
  constructor(data) {
    super(data);
    this._state.isFavorite = false;

    this._onSubmitCallback = null;
    this._onDeleteCallback = null;
    this._onKeyEsc = null;
    this._onKeyDownEsc = this._onKeyDownEsc.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._onChangeTime = this._onChangeTime.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmitCallback = fn;
  }

  set onDelete(fn) {
    this._onDeleteCallback = fn;
  }

  set onKeyEsc(fn) {
    this._onKeyEscCallback = fn;
  }

  get template() {
    return createPointEditTemplate(this._data);
  }

  static createMapper(target) {
    target.offers = target.offers.map((offer) => {
      offer.accepted = false;
      return offer;
    });

    return {
      offers: (value) => {
        const foundOffer = target.offers.find((offer) => offer.id === value);
        if (foundOffer) {
          foundOffer.accepted = true;
        }
      },
      destination: (value) => (target.city = value),
      timeStart: (value) => (target.time.start = Date.parse(moment(value, `x`))),
      timeEnd: (value) => (target.time.end = (moment(value, `x`))),
      price: (value) => (target.price = value),
      travelway: (value) => (target.type = TYPES[value]),
      favorite: (checked) => (target.isFavorite = checked)
    };
  }

  _proccessForm(formData) {
    const newData = cloneDeep(this._data);
    console.log(newData);
    const pointEditMapper = PointEditComponent.createMapper(newData);

    for (const [property, value] of formData.entries()) {
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    return newData;
  }

  _onSubmitButtonClick(e) {
    e.preventDefault();
    const newData = this._proccessForm(new FormData(this._pointForm));
    console.log(newData);

    if (typeof this._onSubmitCallback === `function`) {
      this._onSubmitCallback(newData);
    }

    this.update(newData);
  }

  _onDeleteButtonClick(e) {
    e.preventDefault();
    if (typeof this._onDeleteCallback === `function` && this._onDelete({id: this._data.id})) {
      this._onDeleteCallback();
    }
  }

  _onKeyDownEsc(e) {
    return (typeof this._onKeyEsc === `function`) && (e.keyCode === 27) && this._onKeyEsc();
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

  _addListeners() {
    this._pointForm = this._element.querySelector(`.point form`);
    this._pointDelete = this._element.querySelector(`.point__button[type="reset"]`);
    this._pointFavorite = this._element.querySelector(`.point__favorite`);
    this._pointForm.addEventListener(`submit`, this._onSubmitButtonClick);
    this._pointForm.addEventListener(`keydown`, this._onKeyDownEsc);
    this._pointDelete.addEventListener(`click`, this._onDeleteButtonClick);
    this._pointFavorite.addEventListener(`click`, this._onChangeFavorite);
  }

  _removeListeners() {
    this._pointForm .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._pointForm.removeEventListener(`keydown`, this._onKeyDownEsc);
    this._pointDelete.removeEventListener(`click`, this._onDeleteButtonClick);
    this._pointFavorite .removeEventListener(`click`, this._onChangeFavorite);
    this._pointForm = null;
    this._pointFavorite = null;
  }

  render() {
    super.render();

    this._timeStartWidget = flatpickr(this._element.querySelector(`.point__input--time-start`), {
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `MM-DD-YYYY`,
    });

    this._timeEndWidget = flatpickr(this._element.querySelector(`.point__input--time-end`), {
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `MM-DD-YYYY`,
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
