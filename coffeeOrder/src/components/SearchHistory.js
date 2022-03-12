function SearchHistory({ target, ref, initState }) {
  const component = document.createElement("div");
  component.className = "SearchHistory";

  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {};

  this.render = () => {
    component.innerHTML = `
        <ul>
          ${this.state.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `;

    target.insertBefore(component, ref);
  };

  this.render();
}

export default SearchHistory;
