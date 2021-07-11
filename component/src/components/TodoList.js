import Component from "../core/Component.js";
import Loading from "./Loading.js";

class TodoList extends Component {
  template() {
    const { todos, isLoading } = this.props;

    return isLoading
      ? `<div class="loading-container"></div>`
      : `<ul>
     ${todos
       .map(
         (todo, idx) =>
           `<li class="todo">
              <span>${todo.title}</span>
              <button class="delete" data-index=${idx}>
                삭제
              </button>
            </li>`
       )
       .join("")}
    </ul>
    `;
  }

  mounted() {
    const loading = this.target.querySelector(".loading-container");
    new Loading(loading);
  }

  setEvent() {
    const { deleteItem } = this.props;

    this.addEvent("click", ".delete", ({ target }) => {
      deleteItem(target.dataset.index);
    });
  }
}

export default TodoList;
