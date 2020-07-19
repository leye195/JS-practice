(() => {
  const slick = document.querySelector(".slick"),
    prevButton = document.querySelector(".left-button-container"),
    nextButton = document.querySelector(".right-button-container");
  let innerWidth = window.innerWidth,
    current = 0;

  const slickInfo = {
    total: slick.childElementCount,
    outerWidth: slick.childElementCount * innerWidth * 0.2,
    imgWidth: innerWidth * 0.2,
    show: 5,
  };
  //239.797
  const handleResize = () => {
    innerWidth = window.innerWidth;
    slickInfo.outerWidth = slick.childElementCount * innerWidth * 0.2;
    slickInfo.imgWidth = innerWidth * 0.2;
    //console.log(slickInfo);
  };
  const handlePrev = () => {
    const { imgWidth } = slickInfo;
    if (current - 1 >= 0) {
      slick.style.transform = `translateX(${-(current - 1) * imgWidth}px)`;
      current--;
    }
  };
  const handleNext = () => {
    const { imgWidth, total, show } = slickInfo;
    if (current + 1 <= total - show) {
      slick.style.transform = `translateX(${-(current + 1) * imgWidth}px)`;
      current++;
    }
  };
  const init = () => {
    window.addEventListener("resize", handleResize);
    console.log(slick.childElementCount);
    prevButton.addEventListener("click", handlePrev);
    nextButton.addEventListener("click", handleNext);
  };
  init();
})();
