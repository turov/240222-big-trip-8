import Component from './component';

export default class Error extends Component {
  get template() {
    return `<div class="error" style="width: 50%; height: 55px; position: fixed; top: 50%; left: 50%; transform: translate(-50%); text-align: center; padding: 20px; background: white; font-size: 21px; font-weight: 900; color: #0D8AE4; box-shadow: 0 11px 20px 0 rgba(0,0,0,0.22);">
    Something went wrong while loading your route info. Check your connection or try again later
      </p>`;
  }
}
