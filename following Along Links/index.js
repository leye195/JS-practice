(() => {
  const nav = document.querySelector("nav");
  const links = document.querySelectorAll(".item");
  const highlight = document.createElement("span");
  const background = document.querySelector(".dropdownBackground");
  const highlightLink = (e) => {
    const { target } = e;
    const dropDown = target.querySelector(".dropdown");
    target.classList.add("trigger-enter");
    setTimeout(
      () =>
        target.classList.contains("trigger-enter") &&
        target.classList.add("trigger-enter-active"),
      150
    );
    const navCoords = nav.getBoundingClientRect();
    const dropDownCoords = dropDown.getBoundingClientRect();
    background.classList.add("open");
    moveHighlight(target.querySelector("p").getBoundingClientRect());
    moveDropDownBackground({
      height: dropDownCoords.height,
      width: dropDownCoords.width,
      top: dropDownCoords.top - navCoords.top,
      left: dropDownCoords.left - navCoords.left,
    });
  };
  const moveDropDownBackground = ({ width, height, top, left }) => {
    background.style.cssText = `width:${width}px; height:${height}px; transform:translate(${left}px,${top}px)`;
  };
  const moveHighlight = ({ width, height, top, left }) => {
    highlight.style.cssText = `width:${width}px; height:${height}px; transform:translate(${left}px,${top}px)`;
  };

  const initHighlight = () => {
    highlight.classList.add("highlight");
    document.body.appendChild(highlight);
    moveHighlight(links[0].querySelector("p").getBoundingClientRect());
  };

  const handleLeave = (e) => {
    const { target } = e;
    if (target.classList.contains("trigger-enter")) {
      target.classList.remove("trigger-enter", "trigger-enter-active");
      background.classList.remove("open");
    }
  };

  const init = () => {
    initHighlight();
    links.forEach((link) => {
      link.addEventListener("mouseenter", highlightLink);
    });
    links.forEach((link) => link.addEventListener("mouseleave", handleLeave));
  };
  init();
})();
