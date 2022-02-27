import { changeRoute } from "../route.js";
import { convertFormat } from "../lib/utils.js";

function ProductList({ target, initState }) {
  const component = document.createElement("ul");

  this.state = initState;

  const handleClick = (e) => {
    const { target } = e;
    const productId = target.closest("li").dataset.id;

    if (productId) {
      changeRoute(`/products/${productId}`);
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {
    component.addEventListener("click", handleClick);
  };

  this.render = () => {
    component.innerHTML = `
            ${this.state
              .map(
                (product) => `
                <li class="Product" data-id="${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}"/>
                    <div class="Product__info">
                        <div>${product.name}</div>
                        <div>${convertFormat(product.price)}원~</div>
                    </div>
                </li>
            `
              )
              .join("")}
        `;
    target.appendChild(component);
  };

  this.render();
  this.addEventListeners();
}

export default ProductList;
