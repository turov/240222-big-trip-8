import cloneDeep from 'lodash.clonedeep';
import flatpickr from 'flatpickr';
import Component from './component';
import {createPointEditTemplate} from '../templates/point-edit-template';
import {TYPES} from '../mocks/types';

const TEXT_SAVING = `Saving..`;
const TEXT_SAVE = `Save`;

const defaultData = {point: {}, destinations: []};

export default class PointEdit extends Component {
  constructor(data = defaultData) {
    super(data);

    this._isVisible = true;

    this._onSubmitCallback = null;
    this._onDeleteCallback = null;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._onChangeTime = this._onChangeTime.bind(this);

    this.shake = this.shake.bind(this);
    this.unshake = this.unshake.bind(this);
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmitCallback = fn;
  }

  set onDelete(fn) {
    this._onDeleteCallback = fn;
  }

  get template() {
    return createPointEditTemplate(this._data, this._options);
  }

  get isVisible() {
    return this._isVisible;
  }

  static createMapper(target) {
    target.offers = target.offers
      ? target.offers.map((offer) => {
        offer.accepted = false;
        return offer;
      })
      : [];

    return {
      offers: (value) => {
        const foundOffer = target.offers.find((offer) => offer.id === value);
        if (foundOffer) {
          foundOffer.accepted = true;
        }
      },
      destination: (value) => (target.city = value),
      timeStart: (value) => (target.time.start = parseInt(value, 10)),
      timeEnd: (value) => (target.time.end = parseInt(value, 10)),
      price: (value) => (target.price = parseInt(value, 10)),
      travelway: (value) => (target.type = TYPES[value]),
      favorite: (checked) => (target.isFavourite = checked)
    };
  }

  show() {
    this._isVisible = true;
    this._element.style.display = `block`;
  }

  hide() {
    this._isVisible = false;
    this._element.style.display = `none`;
  }

  shake() {
    this._element.classList.add(`shake`);
  }

  unshake() {
    this._element.classList.remove(`shake`);
  }

  block() {
    this._pointFormSubmitButton.textContent = TEXT_SAVING;
    this._pointForm.setAttribute(`disabled`, `disabled`);
  }

  unblock() {
    this._pointFormSubmitButton.textContent = TEXT_SAVE;
    this._pointForm.removeAttribute(`disabled`);
  }

  _proccessForm(formData) {
    const newPointData = cloneDeep(this._data.point);
    const pointEditMapper = PointEdit.createMapper(newPointData);

    for (const [property, value] of formData.entries()) {
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    return newPointData;
  }

  _onSubmitButtonClick(e) {
    e.preventDefault();
    const newPointData = this._proccessForm(new FormData(this._pointForm));

    if (typeof this._onSubmitCallback === `function`) {
      this._onSubmitCallback(newPointData, {
        block: this.block,
        unblock: this.unblock
      });
    }
  }

  _onDeleteButtonClick(e) {
    e.preventDefault();
    if (typeof this._onDeleteCallback === `function`) {
      this._onDeleteCallback(this._data.point, {
        block: this.block,
        unblock: this.unblock,
        shake: this.shake,
        unshake: this.unshake
      });
    }
  }

  _onChangeTime() {
    this._removeListeners();
    this._partialUpdate();
    this._addListeners();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template; // @TODO: check security
  }

  _addListeners() {
    this._pointForm = this._element.querySelector(`.point form`);
    this._pointDelete = this._element.querySelector(`.point__button[type="reset"]`);
    this._pointFormSubmitButton = this._element.querySelector(`.point__button[type="submit"]`);

    this._pointForm.addEventListener(`submit`, this._onSubmitButtonClick);
    this._pointDelete.addEventListener(`click`, this._onDeleteButtonClick);
  }

  _removeListeners() {
    this._pointForm .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._pointDelete.removeEventListener(`click`, this._onDeleteButtonClick);
    this._pointForm = null;
    this._pointFormSubmitButton = null;
  }

  render() {
    const element = super.render();

    this._timeStartWidget = flatpickr(element.querySelector(`.point__input--time-start`), {
      enableTime: true,
      altInput: true,
      altFormat: `Y-m-d H:i`,
      dateFormat: `U`,
    });

    this._timeEndWidget = flatpickr(element.querySelector(`.point__input--time-end`), {
      enableTime: true,
      altInput: true,
      altFormat: `Y-m-d H:i`,
      dateFormat: `U`,
    });

    return element;
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
