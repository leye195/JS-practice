(() => {
  const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("prefers-reduced-motion:reduce").matches) {
    animate();
  }

  function animate() {
    scrollers.forEach((scroller) => {
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(clone);
      });

      scroller.setAttribute("data-animated", "true");
      scroller.style.maxWidth = `${scrollerInner.clientWidth / 2}px`;
    });
  }
})();
