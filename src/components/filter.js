import Component from './component';
import {createFilterTemplate} from '../templates/filters-template';

const defaultData = {filter: {}, points: []};

export default class Filter extends Component {
  constructor(data = defaultData) {
    super(data);
    const {filter: {filterBy}, points} = this._data;

    this._total = points.filter(filterBy).length;
    this._onInputChange = this._onInputChange.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data.filter, this._total);
  }

  update(data) {
    super.update(data);
    const {filter: {filterBy}, points} = this._data;
    this._total = points.filter(filterBy).length;
  }

  _onInputChange(e) {
    e.preventDefault();
    if (typeof this._changeCallback === `function` && this._total) {
      this._changeCallback(this._data.filter.filterBy);
    }
  }

  set onChange(fn) {
    this._changeCallback = fn;
  }

  _addListeners() {
    this.elementInput = this._element.querySelector(`input[type="radio"]`);
    this.elementInput.addEventListener(`change`, this._onInputChange);
  }

  _removeListeners() {
    this.elementInput.removeEventListener(`change`, this._onInputChange);
    this.elementInput = null;
  }
}
