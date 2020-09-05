(() => {
  const container = document.querySelector(".container"),
    h1Container = document.querySelector(".h1-container"),
    h1 = document.querySelector("h1");
  const images = container.querySelectorAll("img");
  const walk = 10;
  const debounce = (func, wait = 20, immediate = true) => {
    let timer = null;
    return () => {
      const later = () => {
        timer = null;
        if (!immediate) func();
      };
      const callNow = immediate && !timer;
      clearTimeout(timer);
      timer = setTimeout(later, wait);
      if (callNow) func();
    };
  };
  const handleScroll = () => {
    images.forEach((img) => {
      const slideInAt = window.scrollY + window.innerHeight - img.height / 2;
      const imgTop = img.offsetTop;
      if (imgTop <= slideInAt) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    });
  };
  const handleMove = (e) => {
    const { offsetX: x, offsetY: y } = e;
    const { offsetHeight: height, offsetWidth: width } = h1;
    const xWalk = Math.round((x / width) * walk - walk / 2);
    const yWalk = Math.round((y / height) * walk - walk / 2);
    h1.style.textShadow = `${xWalk}px ${yWalk}px 15px rgba(255,211,0,0.6)`;
  };
  const init = () => {
    window.addEventListener("scroll", debounce(handleScroll));
    h1Container.addEventListener("mousemove", handleMove);
  };
  init();
})();
