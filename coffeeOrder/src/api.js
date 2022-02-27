const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/";

const request = async (url, configs) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, configs);
    if (res.ok) {
      const json = await res.json();

      return json;
    }
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

export const fetchProductList = async () => {
  const products = await request("products");
  return products;
};

export const fetchProductDetail = async (id) => {
  const product = await request(`products/${id}`);
  return product;
};
