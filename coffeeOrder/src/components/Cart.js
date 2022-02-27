import { convertFormat, removeItem } from "../lib/utils.js";
import { changeRoute } from "../route.js";

function Cart({ target, initState }) {
  const component = document.createElement("div");
  component.className = "Cart";

  this.state = initState;

  const getTotalPrice = () => {
    const { carts } = this.state;
    return carts.reduce(
      (acc, cart) =>
        acc + (cart.productPrice + cart.optionPrice) * cart.quantity,
      0
    );
  };

  const handleSubmit = (e) => {
    const { target } = e;

    if (target.className === "OrderButton") {
      alert("주문이 되었습니다");
      removeItem("products_cart");
      changeRoute("/");
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.addEventListeners = () => {
    component.addEventListener("click", handleSubmit);
  };

  this.render = () => {
    const { carts } = this.state;
    component.innerHTML = `
      <ul>
        ${carts.map(
          (cartItem) => `
        <li class="Cart__item">
          <img src="${cartItem.imageUrl}" alt="${cartItem.productName}"/>
          <div class="Cart__itemDesription">
            <div>${cartItem.productName} ${cartItem.optionName} ${
            cartItem.quantity
          }개</div>
            <div>${convertFormat(
              cartItem.productPrice + cartItem.optionPrice
            )}원</div>
          </div>
        </li>`
        )}
      </ul>
      <div class="Cart__totalPrice">총 상품가격 ${convertFormat(
        getTotalPrice()
      )}원</div>
      <button class="OrderButton">주문하기</button>
    `;
    target.appendChild(component);
  };

  this.render();
  this.addEventListeners();
}

export default Cart;
