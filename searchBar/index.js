(() => {
  const input = document.querySelector(".search-container input"),
    searches = document.querySelector(".searches");
  const dataUrl =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
  let cities = [];
  const loadData = async () => {
    const data = await fetch(dataUrl).then((data) => data.json());
    cities = [...data];
  };
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const clearSearchResult = () => {
    searches.innerHTML = `<ul>
      <li>Filter For a City</li>
      <li>Or a State</li>
      </ul>`;
  };
  const handleFocus = () => {
    searches.classList.toggle("hide");
  };
  const handleBlur = () => {
    searches.classList.toggle("hide");
  };
  const handleInput = (e) => {
    const {
      target: { value },
    } = e;
    let result = [],
      regex = null;
    if (value !== "") {
      regex = new RegExp(value, "gi");
      result = cities.filter(
        (place) => place.city.match(regex) || place.state.match(regex)
      );
      displayMatches(result, regex, value);
    } else {
      clearSearchResult();
    }
  };
  const displayMatches = (result, regex, value) => {
    if (regex !== null) {
      searches.innerHTML = `
    <ul>
        ${result
          .map(({ city, state, population }) => {
            const cityName = city.replace(
              regex,
              `<span class="hi">${value}</span>`
            );
            const stateName = state.replace(
              regex,
              `<span class="hi">${value}</span>`
            );
            return `
        <li>
            <span>${cityName}, ${stateName}</span>
            <span>${numberWithCommas(population)}</span>
        </li>`;
          })
          .join("")}
    </ul>
    `;
    }
  };
  const init = () => {
    loadData();
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
    input.addEventListener("input", handleInput);
  };
  init();
})();
