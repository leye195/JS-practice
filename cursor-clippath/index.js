const imageContainer = document.querySelector(".image-box");

const handleMouseMove = (e) => () => {
  const { pageX, pageY } = e;
  const { width, height, left, top } = e.target.getBoundingClientRect();

  const light = imageContainer.querySelector(".light");

  const x = pageX - left;
  const y = pageY - top;

  const xPercent = (x / width) * 100;
  const yPercent = (y / height) * 100;

  light.style.clipPath = `circle(100px at ${xPercent}% ${yPercent}%)`;
  light.style.opacity = "1";
};

const handleMouseLeave = () => {
  const light = imageContainer.querySelector(".light");
  light.style.opacity = "0";
};

const init = () => {
  imageContainer.addEventListener("mousemove", (e) => {
    requestAnimationFrame(handleMouseMove(e));
  });
  imageContainer.addEventListener("mouseleave", handleMouseLeave);
};

init();
