import { fetchProductList } from "../api.js";
import ProductList from "../components/ProductList.js";

function ProductListPage({ target }) {
  const page = document.createElement("div");
  page.className = "ProductListPage";
  page.innerHTML = "<h1>상품목록</h1>";
  target.appendChild(page);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await fetchProductList();
    this.setState(products);
  };

  this.render = () => {
    new ProductList({ target: page, initState: this.state });
  };

  this.fetchProducts();
}

export default ProductListPage;
