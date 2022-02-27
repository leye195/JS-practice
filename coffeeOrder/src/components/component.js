function Component({ target, initState }) {
  const component = document.createElement("div");
  component.className = "ProductDetail";

  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {};

  this.render = () => {
    target.appendChild(component);
  };
}

export default Component;
