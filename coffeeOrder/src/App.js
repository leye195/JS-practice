import CartPage from "./page/CartPage.js";
import ProductDetailPage from "./page/ProductDetailPage.js";
import ProductListPage from "./page/ProductListPage.js";
import { init } from "./route.js";

function App({ target }) {
  this.route = () => {
    const { pathname } = location;
    target.innerHTML = "";

    if (pathname === "/") {
      new ProductListPage({ target });
    } else if (pathname.indexOf("/products") === 0) {
      const [, , productId] = pathname.split("/");
      new ProductDetailPage({ target, productId });
    } else if (pathname === "/cart") {
      new CartPage({ target });
    }
  };

  init(this.route);
  this.route();
}

export default App;
