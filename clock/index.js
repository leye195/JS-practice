(() => {
  const hours = document.querySelector(".hour"),
    minutes = document.querySelector(".minute"),
    seconds = document.querySelector(".second"),
    digit = document.querySelector(".digit"),
    settingBtn = document.querySelector(".setting-btn"),
    menu = document.querySelector(".menu");

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

  const toggleButton = (e) => {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      menu.classList.add("hide");
    } else {
      menu.classList.remove("hide");
      menu.classList.add("show");
    }
  };

  const handleUpdate = (e) => {
    const { target } = e;
    document.documentElement.style.setProperty(
      `--${target.name}`,
      target.value
    );
    //console.log(target.value, target.name);
  };

  const init = () => {
    setTime();
    setInterval(setTime, 1000);
    settingBtn.addEventListener("click", toggleButton);
    menu.addEventListener("input", handleUpdate);
  };
  init();
})();
