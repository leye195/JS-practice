(() => {
  const panelsContainer = document.querySelector(".panels");
  const panel = panelsContainer.querySelectorAll(".panel");
  const handleClick = (e) => {
    const { target } = e;
    const parent = target.parentNode;
    if (parent.classList.contains("active")) {
      parent.classList.remove("active");
    } else {
      panel.forEach((item) => item.classList.remove("active"));

      parent.classList.add("active");
    }
  };
  const init = () => {
    panelsContainer.addEventListener("click", handleClick);
  };
  init();
})();
