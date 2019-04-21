import Component from './component';

export default class Error extends Component {
  get template() {
    `<div class="error-message">
      Something went wrong while loading your route info. Check your connection or try again later
    </div>`;
  }
}