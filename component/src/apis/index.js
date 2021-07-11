const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = {
  getToDos: async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    return res.json();
  },
};

export default api;
