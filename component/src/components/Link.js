import Component from "../core/Component.js";

class Link extends Component {
  template() {
    const { to, title } = this.props;
    return `
        <div class="link-box">
          <span class="history" to=${to}>${title}</span>
        </div>
      `;
  }

  setEvent() {
    const { to, state = {}, title } = this.props;
    const { origin, pathname } = window.location;
    this.addEvent("click", `[to="${to}"]`, () => {
      if (
        `${origin}${pathname.slice(0, pathname.length - 1)}${to}` !==
        `${origin}${pathname}`
      ) {
        history.pushState(
          state,
          title || document.title,
          `${origin}${pathname.slice(0, pathname.length - 1)}${to}`
        );
      }
    });
  }
}

export default Link;
