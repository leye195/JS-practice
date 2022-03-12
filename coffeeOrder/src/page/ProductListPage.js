import ProductList from "../components/ProductList.js";
import SearchInput from "../components/SearchInput.js";

import { fetchProductList, fetchSuggestions } from "../api.js";
import { getItems, saveItem } from "../lib/utils.js";

function ProductListPage({ target }) {
  const page = document.createElement("div");
  page.className = "ProductListPage";
  page.innerHTML = "<h1>상품목록</h1>";
  target.appendChild(page);

  let productList = null;
  let searchInput = null;

  const handleInput = async (e) => {
    const { target } = e;

    if (target.tagName === "INPUT") {
      const keyword = target.value;
      let data = getItems("suggest", []);
      let { suggestion = [] } =
        data.filter((item) => item.keyword === keyword)[0] ?? {};

      if (suggestion.length <= 0) {
        suggestion = keyword ? await fetchSuggestionsData() : [];

        saveItem("suggest", [...data, { keyword, suggestion }]);
      }

      searchInput.setState({ keyword, suggestion });
      saveItem("keyword", keyword);
    }
  };

  const handleKeyDown = (e) => {
    const { keyCode, target, currentTarget } = e;
    const items = currentTarget.querySelectorAll("li");
    let idx = Array.from(items).indexOf(target);

    if (keyCode === 40) {
      idx = idx + 1 < items.length ? idx + 1 : 0;
    } else if (keyCode === 38) {
      idx = idx - 1 >= 0 ? idx - 1 : items.length - 1;
    }

    items[idx].focus();
  };

  const handleClick = (e) => {
    const { target } = e;

    if (target.tagName === "LI") {
      const value = target.innerHTML.trim();
      let items = getItems("selected", []);
      const isExist = items.find((item) => item === value);

      if (isExist) {
        items = items.filter((item) => item !== value);
      } else if (items.length >= 5) {
        items = [...items.slice(1)];
      }

      const newHistory = [...items, value.trim()];

      searchInput.setState({ ...searchInput.state, history: newHistory });
      saveItem("selected", newHistory);
      alert(target.innerHTML);
    }
  };

  this.state = {
    products: [],
    keyword: "",
    history: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const fetchSuggestionsData = async () => {
    const suggestion = await fetchSuggestions();
    return suggestion;
  };

  this.fetchProductsAndSearches = async () => {
    const products = (await fetchProductList()) ?? [];
    const keyword = getItems("keyword", "");
    const history = getItems("selected", []);

    this.setState({ ...this.state, keyword, products, history });
  };

  this.render = () => {
    page.innerHTML = "<h1>상품목록</h1>";

    searchInput = new SearchInput({
      target: page,
      initState: {
        keyword: this.state.keyword,
        history: this.state.history,
        handleInput,
        handleClick,
        handleKeyDown,
      },
    });
    productList = new ProductList({
      target: page,
      initState: this.state.products,
    });
  };

  this.fetchProductsAndSearches();
}

export default ProductListPage;
