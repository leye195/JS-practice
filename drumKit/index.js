(() => {
  //const keys = document.querySelector(".keys");
  const handleKeyDown = (e) => {
    const { keyCode } = e;
    const key = document.querySelector(`.key[data-key="${keyCode}"]`),
      audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (key) {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      key.classList.add("playing");
    }
  };

  const handleKeyUp = (e) => {
    const { keyCode } = e;
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (key) key.classList.remove("playing");
  };
  const addEventListeners = () => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  };
  const init = () => {
    addEventListeners();
  };
  init();
})();
