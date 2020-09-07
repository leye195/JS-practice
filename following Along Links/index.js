(() => {
  const links = document.querySelectorAll("ul li");
  const highlight = document.createElement("span");

  const highlightLink = (e) => {
    const { target } = e;
    moveHighlight(target.getBoundingClientRect());
  };

  const moveHighlight = ({ width, height, top, left }) => {
    highlight.style.cssText = `width:${width}px; height:${height}px; transform:translate(${left}px,${top}px)`;
  };

  const initHighlight = () => {
    highlight.classList.add("highlight");
    document.body.appendChild(highlight);
    moveHighlight(links[0].getBoundingClientRect());
  };

  const init = () => {
    initHighlight();
    links.forEach((link) => {
      link.addEventListener("mouseenter", highlightLink);
    });
  };
  init();
})();
