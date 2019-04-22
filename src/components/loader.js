import Component from './component';

export default class Loader extends Component {
  get template() {
    return (
      `<div class="message">
        Loading route…
      </div>`
    );
  }
}
