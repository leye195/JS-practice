function Suggestion({ target, initState }) {
  const component = document.createElement("div");
  component.className = "Suggestion";

  this.state = initState;

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {
    const { handleClick, handleKeyDown } = this.state;
    component.addEventListener("click", handleClick);
    component.addEventListener("keydown", handleKeyDown);
  };

  this.render = () => {
    const { suggestion, keyword } = this.state;

    if (keyword.length <= 0 || suggestion.length <= 0) {
      const suggestionComponent = document.querySelector(".Suggestion");

      if (suggestionComponent) {
        target.removeChild(suggestionComponent);
      }

      return;
    }

    component.innerHTML = `
      <ul>
        ${suggestion
          .map(
            ({ title }) => `
        <li tabindex="0" >
          ${title} 
        </li>
        `
          )
          .join("")}
      </ul>
      `;
    target.appendChild(component);

    component.focus();
  };

  this.addEventListeners();
}

export default Suggestion;
