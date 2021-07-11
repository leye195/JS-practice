import Component from "../core/Component.js";

class Loading extends Component {
  template() {
    return `<div class="loading-wrapper">
        <div class="loading"></div>
        <p class="loading-text">Loading...</p>
    </div>`;
  }
}

export default Loading;
