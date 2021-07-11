import Component from "../core/Component.js";
import Link from "./Link.js";

class Header extends Component {
  template() {
    return `
    <div class="header">
      <p>VanilaJS Component</p>
      <div class="link-container">
      </div>
    </div>`;
  }

  mounted() {
    const linkContainer = this.target.querySelector(".link-container");

    new Link(linkContainer, {
      to: "/",
      title: "ToDo",
    });
  }
}

export default Header;
