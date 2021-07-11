import Component from "../core/Component.js";

class Button extends Component {
  template() {
    const { className, name } = this.props;

    return `<button class=${className}>${name}</button>`;
  }

  setEvent() {
    const { addItem, className } = this.props;
    this.addEvent("click", `.${className}`, () => {
      const input = document.querySelector(".todo-input");
      addItem(input.value);
    });
  }
}

export default Button;
