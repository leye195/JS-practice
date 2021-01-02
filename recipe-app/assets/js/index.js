(() => {
  const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;

  const categoriesDOM = document.querySelector(".categories");
  const foodsDOM = document.querySelector(".foods");
  const modalDOM = document.querySelector(".modal");

  const formatDescription = (s) => {
    return s
      .split("\n")
      .map((line, index) => {
        if (index > 0) return `${line}<br/>`;
        else return `${line}`;
      })
      .join("");
  };

  const handleClickCategory = (e) => {
    const { target } = e;
    let node = target;
    while (node.nodeName !== "LI") {
      node = node.parentNode;
    }
    const {
      dataset: { name },
    } = node;
    getFoods(name);
    foodsDOM.scrollTo(0, 0);
  };

  const handleClickFood = (e) => {
    const { target } = e;
    let node = target;
    while (node.nodeName !== "ARTICLE") {
      node = node.parentNode;
    }
    const { dataset } = node;
    if (modalDOM.classList.contains("modal--hide")) {
      modalDOM.classList.remove("modal--hide");
      getFoodDetails(dataset.id);
    }
  };

  const handleCloseModal = (e) => {
    console.log(e.target, modalDOM);
    console.log("...");
    if (!modalDOM.classList.contains("modal--hide")) {
      modalDOM.classList.add("modal--hide");
    }
  };

  const getCategoriesData = async () => {
    const response = await fetch(`${BASE_URL}categories.php`);
    if (response.ok) {
      const { categories } = await response.json();
      categoriesDOM.innerHTML = categories
        .map((category) => {
          const { strCategory, strCategoryThumb } = category;
          return `
        <li class='category' data-name='${strCategory[0].toUpperCase()}${strCategory.slice(
            1
          )}'>
            <figure class='category-content'>
                <img
                class='category-image'
                src='${strCategoryThumb}'
                alt='${strCategory}'
                />
                <figcaption class='category-text'>${strCategory}</figcaption>
            </figure>
        </li>
          `;
        })
        .join("");
      categoriesDOM.addEventListener("click", handleClickCategory);
    }
  };

  const getFoods = async (term = "Beef") => {
    const response = await fetch(`${BASE_URL}filter.php?c=${term}`);
    if (response.ok) {
      const { meals } = await response.json();
      foodsDOM.innerHTML = meals.map((meal) => {
        console.log(meal);
        const { idMeal, strMeal, strMealThumb } = meal;
        return `
          <article class='food' data-name='${strMeal}' data-id='${idMeal}'>
            <header class='food-header'>
                <div class='food-tag'>${term}</div>
                <img
                class='food-image'
                src='${strMealThumb}'
                alt='${strMeal}'
                />
            </header>
            <div class='food-body'>
                <p class='food-name'>${strMeal}</p>
            </div>
          </article>
          `;
      });
      foodsDOM.addEventListener("click", handleClickFood);
    }
  };

  const getFoodDetails = async (id) => {
    const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
    if (response.ok) {
      const { meals } = await response.json();
      const {
        strMeal,
        strMealThumb,
        strInstructions,
        //strIngredient1,
      } = meals[0];
      //console.log(formatDescription(strInstructions));
      modalDOM.innerHTML = `
      <header class="modal__header">
      <svg
        class="modal__header-close"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
        />
      </svg>
    </header>
    <h2 class='modal__food-name'>${strMeal}</h2>
    <img
      class='modal__food-image'
      src='${strMealThumb}'
      alt='${strMeal}'
    />
    
    <p class='modal__food-subtitle'>
      <strong>Instruction</strong>
    <p/>
    <p class='modal__food-description'>
        ${formatDescription(strInstructions)}
    </p>
      `;
      modalDOM
        .querySelector(".modal__header-close")
        .addEventListener("click", handleCloseModal);
    }
  };

  const initData = () => {
    getCategoriesData();
    getFoods();
  };

  initData();
})();
