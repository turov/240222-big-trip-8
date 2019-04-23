import Component from './component';
import {createTotalPriceTemplate} from '../templates/total-price-template';

export default class Total extends Component {
  get template() {
    return createTotalPriceTemplate(this._data);
  }
}
