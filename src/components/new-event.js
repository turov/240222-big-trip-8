import Component from './component';

export default class NewEventComponent extends Component {
  get template() {
    return (
      `<button class="trip-controls__new-event new-event">+ New Event</button>`
    );
  }

  set onClick(fn) {
    this._clickCallback = fn;
  }

  _addListeners() {
    this.element.addEventListener(`click`, this._clickCallback);
  }

  _removeListeners() {
    this.element.removeEventListener(`click`, this._clickCallback);
  }
}
