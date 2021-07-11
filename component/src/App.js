import Component from "./core/Component.js";
import Button from "./components/Button.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import Header from "./components/Header.js";
import apis from "./apis/index.js";

class App extends Component {
  setup() {
    this.state = { todos: [], isLoading: true };
    this.loadToDos();
  }

  template() {
    return `
     <header data-component="header"></header>
     <h1>ToDo List</h1>
     <div data-component="todo-container">
       <div data-component="todo-input-wrapper">
         <div data-component="todo-input"></div>
         <div data-component="todo-button"></div>
       </div>
       <div data-component="todo-items"></div>
     </div>
    `;
  }

  mounted() {
    const { handleAddItem, handleDeleteItem } = this;

    const header = this.target.querySelector('[data-component="header"]');

    const todoInput = this.target.querySelector(
      '[data-component="todo-input"]'
    );
    const addTodoButton = this.target.querySelector(
      '[data-component="todo-button"]'
    );

    const todos = this.target.querySelector('[data-component="todo-items"]');

    new Header(header);

    new TodoInput(todoInput, {
      addItem: handleAddItem.bind(this),
    });

    new Button(addTodoButton, {
      addItem: handleAddItem.bind(this),
      name: "추가",
      className: "add",
    });

    new TodoList(todos, {
      addItem: handleAddItem.bind(this),
      deleteItem: handleDeleteItem.bind(this),
      todos: this.state.todos,
      isLoading: this.state.isLoading,
    });
  }

  async loadToDos() {
    try {
      const todos = await apis.getToDos();
      this.setState({ ...this.state, todos, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  handleAddItem(contents) {
    const { todos } = this.state;
    this.setState({
      ...this.state,
      todos: [
        ...todos,
        { id: todos.length + 1, title: contents, completed: false },
      ],
    });
  }

  handleDeleteItem(idx) {
    const todos = [...this.state.todos];
    todos.splice(idx, 1);
    this.setState({ todos });
  }
}

export default App;
