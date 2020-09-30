(() => {
  const slider = document.querySelector(".items");
  let isDown = false;
  let startX;
  let scrollLeft;
  let speed = 2.2;
  const handleGrap = (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    speed = 2;
  };
  const handleUnGrap = (e) => {
    isDown = false;
    slider.classList.remove("active");
  };
  const handleLeave = (e) => {
    isDown = false;
    slider.classList.remove("active");
  };
  const handleMove = (e) => {
    if (!isDown) return; //stop moving
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * speed;
    slider.scrollLeft = scrollLeft - walk;
  };
  const init = () => {
    slider.addEventListener("mousedown", handleGrap);
    slider.addEventListener("mouseup", handleUnGrap);
    slider.addEventListener("mouseleave", handleLeave);
    slider.addEventListener("mousemove", handleMove);
  };
  init();
})();
