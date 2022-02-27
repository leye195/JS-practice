import { convertFormat, getItems, saveItem } from "../lib/utils.js";
import { changeRoute } from "../route.js";

function SelectedOptions({ target, initState }) {
  const component = document.createElement("div");
  component.className = "ProductDetail__selectedOptions";

  this.state = initState;

  const getTotalPrice = () => {
    const { product, selectedOptions } = this.state;

    return selectedOptions.reduce(
      (acc, option) =>
        acc + (option.optionPrice + product.price) * option.quantity,
      0
    );
  };

  const handleOrder = (e) => {
    const { target } = e;
    const { selectedOptions } = this.state;

    if (target.className === "OrderButton") {
      const nextSelectedOptions = [
        ...getItems("products_cart", []),
        ...selectedOptions,
      ];
      saveItem("products_cart", nextSelectedOptions);
      changeRoute("/cart");
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const { selectedOptions } = this.state;

    if (target.tagName === "INPUT") {
      const { dataset, value } = target;
      const id = +dataset.id;
      const optionIndex = selectedOptions.findIndex(
        (option) => option.optionId === id
      );

      if (optionIndex > -1) {
        selectedOptions[optionIndex] = {
          ...selectedOptions[optionIndex],
          quantity: +value,
        };

        this.setState({ ...this.state, selectedOptions });
      }
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {
    component.addEventListener("click", handleOrder);
    component.addEventListener("change", handleInput);
  };

  this.render = () => {
    const { product, selectedOptions = [] } = this.state;

    if (product && selectedOptions) {
      component.innerHTML = `
    <h3>선택된 상품</h3>
    <ul>
      ${selectedOptions
        .map(
          (option) => `
        <li>
          ${option.optionName} ${convertFormat(
            product.price + option.optionPrice
          )}원
          <div>
            <input min="1" type="number" data-id="${option.optionId}" value="${
            option.quantity
          }"/>개
          </div>
        </li>
      `
        )
        .join("")}
    </ul>
    <div class="ProductDetail__totalPrice">${convertFormat(
      getTotalPrice()
    )}원</div>
    <button class="OrderButton">주문하기</button>
    `;

      target.appendChild(component);
    }
  };

  this.render();
  this.addEventListeners();
}

export default SelectedOptions;
