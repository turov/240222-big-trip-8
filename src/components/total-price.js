import Component from './component';
import {createTotalPriceTemplate} from '../templates/total-price-template';

export default class TotalPrice extends Component {
  get template() {
    return createTotalPriceTemplate(this._data);
  }
}
