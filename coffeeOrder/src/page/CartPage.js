import Cart from "../components/Cart.js";
import { fetchProductDetail } from "../api.js";
import { changeRoute } from "../route.js";
import { getItems } from "../lib/utils.js";

function CartPage({ target }) {
  const page = document.createElement("div");
  page.className = "CartPage";
  page.innerHTML = "<h1>장바구니</h1>";

  const cartData = getItems("products_cart", []);
  let cartComponent = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cart) => {
        const product = await fetchProductDetail(cart.productId);
        return {
          ...cart,
          productName: product.name,
          productPrice: product.price,
          imageUrl: product.imageUrl,
        };
      })
    );
    this.setState({ products });
  };

  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비어 있습니다");
      changeRoute("/");
      return;
    }
    target.appendChild(page);

    if (this.state.products && !cartComponent) {
      cartComponent = new Cart({
        target: page,
        initState: { carts: this.state.products },
      });
    }
  };

  this.fetchProducts();
}

export default CartPage;
