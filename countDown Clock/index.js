(() => {
  const items = document.querySelector(".items");
  const remainTime = document.querySelector("#remain-time");
  const returnTime = document.querySelector("#return-time");
  const timeInput = document.getElementById("time");

  let timeSeconds = 0;
  let timer = null;

  const timeFormat = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds - h * 3600) / 60);
    const s = seconds - h * 3600 - m * 60;
    if (h === 0)
      return `${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)}`;
    else
      return `${h.toString().padStart(2, 0)}:${m
        .toString()
        .padStart(2, 0)}:${s.toString().padStart(2, 0)}`;
  };
  const startTimer = (timeSeconds) => {
    if (timer) clearInterval(timer);
    returnTimeCalculate(timeSeconds);
    remainTime.textContent = timeFormat(timeSeconds);
    timer = setInterval(() => {
      if (timeSeconds > 0) {
        timeSeconds -= 1;
        const display = timeFormat(timeSeconds);
        remainTime.textContent = display;
        document.title = `${display} Left`;
      } else {
        clearInterval(timer);
        return;
      }
    }, 1000);
  };
  const returnTimeCalculate = (seconds) => {
    const now = new Date(Date.now());
    const currentTime =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    returnTime.textContent = `Will Be Back At ${timeFormat(
      currentTime + seconds
    )}`;
  };
  const handleClick = (e) => {
    const {
      target,
      target: { dataset },
    } = e;
    if (target.classList.contains("item")) {
      const { time } = dataset;
      if (time === "20sec") {
        timeSeconds = 20;
      } else if (time === "5min") {
        timeSeconds = 5 * 60;
      } else if (time === "15min") {
        timeSeconds = 15 * 60;
      } else if (time === "20min") {
        timeSeconds = 20 * 60;
      } else {
        timeSeconds = 90 * 60;
      }
      startTimer(timeSeconds);
    }
  };
  const handleKeyDown = (e) => {
    const {
      target: { value },
    } = e;
    if (e.key === "Enter") {
      timeSeconds = parseInt(value) * 60;
      startTimer(timeSeconds);
    }
  };
  const init = () => {
    items.addEventListener("click", handleClick);
    timeInput.addEventListener("keydown", handleKeyDown);
  };
  init();
})();
