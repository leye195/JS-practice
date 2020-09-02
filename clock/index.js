(() => {
  const hours = document.querySelector(".hour"),
    minutes = document.querySelector(".minute"),
    seconds = document.querySelector(".second"),
    digit = document.querySelector(".digit");
  const setTime = () => {
    const now = new Date();
    const s = now.getSeconds(),
      m = now.getMinutes(),
      h = now.getHours();
    const sDegree = (s / 60) * 360 + 90;
    const mDegree = (m / 60) * 360 + 90;
    const hDegree = (h / 60) * 360 + 90;
    seconds.style.transform = `rotate(${sDegree}deg)`;
    minutes.style.transform = `rotate(${mDegree}deg)`;
    hours.style.transform = `rotate(${hDegree}deg)`;
    digit.innerHTML = `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  const init = () => {
    setTime();
    setInterval(setTime, 1000);
  };
  init();
})();
