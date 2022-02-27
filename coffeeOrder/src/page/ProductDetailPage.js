import { fetchProductDetail } from "../api.js";
import ProductDetail from "../components/ProductDetail.js";

function ProductDetailPage({ target, productId }) {
  const page = document.createElement("div");
  page.className = "ProductDetailPage";
  page.innerHTML = "<h1>상품 정보</h1>";

  this.state = {
    productId,
    product: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProduct = async () => {
    const product = await fetchProductDetail(productId);
    this.setState({ ...this.state, product });
  };

  this.render = () => {
    const { productId, product } = this.state;

    if (!productId && !product) {
      target.innerHTML = "Loading...";
      return;
    }

    target.innerHTML = "";
    target.appendChild(page);

    new ProductDetail({
      target: page,
      initState: { product, selectedOptions: [] },
    });
  };

  this.fetchProduct();
}

export default ProductDetailPage;
