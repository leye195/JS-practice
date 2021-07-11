import Component from "../core/Component.js";

class TodoInput extends Component {
  template() {
    return `<input type="text" class="todo-input" placeholder="ToDo..." />`;
  }

  setEvent() {
    const { addItem } = this.props;

    this.addEvent("keydown", ".todo-input", ({ key, target }) => {
      if (key !== "Enter") {
        return;
      }
      addItem(target.value);
    });
  }
}

export default TodoInput;
