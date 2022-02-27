import { convertFormat } from "../lib/utils.js";
import SelectedOptions from "./SelectedOptions.js";

function ProductDetail({ target, initState }) {
  const component = document.createElement("div");
  component.className = "ProductDetail";

  let selectedOptions = null;

  const getOptionName = (name, option) => {
    if (option.price === 0) {
      return `<option value="${option.id}">${name} ${option.name}</option>`;
    }

    if (option.stock === 0) {
      return `<option value="${option.id}" disabled >(품절) ${name} ${option.name}</option>`;
    }

    return `<option value="${option.id}">${name} ${
      option.name
    } (+${convertFormat(option.price)}원)</option>`;
  };

  const handleSelect = (e) => {
    const { target } = e;

    if (target.tagName === "SELECT") {
      const { product, selectedOptions } = this.state;
      const value = +target.value;
      const option = product.productOptions.find(
        (option) => option.id === value
      );
      const selectedOption = selectedOptions.find(
        (option) => option.optionId === value
      );

      if (option && !selectedOption) {
        this.setState({
          ...this.state,
          selectedOptions: [
            ...selectedOptions,
            {
              productId: product.id,
              optionId: option.id,
              optionName: option.name,
              optionPrice: option.price,
              quantity: 1,
            },
          ],
        });
      }
    }
  };

  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {
    component.addEventListener("change", handleSelect);
  };

  this.render = () => {
    const { product } = this.state;

    if (product) {
      component.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}"/>
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${convertFormat(
          product.price
        )}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map((option) => getOptionName(product.name, option))
            .join("")}
        </select>
      </div>
    `;

      selectedOptions = new SelectedOptions({
        target: component.querySelector(".ProductDetail__info"),
        initState: { ...this.state },
      });
      target.appendChild(component);
    }
  };

  this.render();
  this.addEventListeners();
}

export default ProductDetail;
