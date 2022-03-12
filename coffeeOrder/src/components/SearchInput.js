import Suggestion from "./Suggestion.js";
import SearchHistory from "./SearchHistory.js";

function SearchInput({ target, initState }) {
  const component = document.createElement("form");
  component.className = "SearchInput";

  let suggestion = null;
  let searchHistory = null;

  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    suggestion.setState({ ...suggestion.state, ...nextState });

    if (nextState.history) {
      searchHistory.setState(nextState.history);
    }
  };

  this.addEventListeners = () => {
    const { handleInput } = this.state;
    component.addEventListener("input", handleInput);
  };

  this.render = () => {
    const { keyword, handleClick, history, handleKeyDown } = this.state;

    component.innerHTML = `<input class="SearchInput__input" type="text" placeholder="Product Name" value="${keyword}" />`;

    target.appendChild(component);

    searchHistory = new SearchHistory({
      target,
      ref: component,
      initState: history,
    });

    suggestion = new Suggestion({
      target,
      initState: {
        keyword,
        suggestion: [],
        handleClick,
        handleKeyDown,
      },
    });
  };

  this.render();
  this.addEventListeners();
}

export default SearchInput;
