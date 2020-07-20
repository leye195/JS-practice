import { getMusicInfo } from "./music.js";
(() => {
  const thumbnail = document.querySelector(".music-image-container img"),
    title = document.querySelector(".music-title-container h3"),
    artist = document.querySelector(".music-title-container h5"),
    progressBarContainer = document.querySelector(".progress-bar"),
    progressBar = document.querySelector(".progress"),
    volumeControll = document.querySelector(".volume-controll"),
    audio = document.querySelector("audio"),
    totalTime = document.querySelector(".total"),
    currentTime = document.querySelector(".current"),
    playButton = document.querySelector("#play"),
    nextButton = document.querySelector("#next"),
    prevButton = document.querySelector("#prev"),
    volumeButton = document.querySelector("#volume");
  let music = {},
    currentIdx = 0,
    total = 0,
    volume = 0.5,
    type = "desktop";

  const modifyClassName = (target, targetClass, newClass) => {
    target.classList.remove(targetClass);
    target.classList.add(newClass);
  };
  const convertTimeFormat = (time) => {
    const h = parseInt(time / 3600, 10);
    const m = parseInt((time - h * 3600) / 60, 10);
    const s = time - h * 3600 - m * 60;
    return `0${m}:${s < 10 ? `0${s}` : s}`;
  };
  const setVolume = (value) => {
    audio.volume = value;
    volumeControll.value = value;
  };
  const checkType = () => {
    const { innerWidth } = window;
    if (innerWidth <= 425) {
      type = "mobile";
    } else if (innerWidth > 426 && innerWidth < 768) {
      type = "tablet";
    } else {
      type = "desktop";
    }
    thumbnail.src =
      type === "desktop"
        ? `${music.data.thumbnail}hqdefault.jpg`
        : `${music.data.thumbnail}mqdefault.jpg`;

    total = music.total;
  };
  const handleProgress = (e) => {
    const { currentTarget, offsetX } = e;
    const { width } = currentTarget.getBoundingClientRect();
    //console.log(offsetX, width);
    const progress = offsetX / width;
    audio.currentTime = audio.duration * progress;
    progressBar.style.width = `${progress * 100}%`;
  };
  const handlePrev = () => {
    if (currentIdx === 0) {
      currentIdx = total - 1;
    } else {
      currentIdx -= 1;
    }
    getMusic();
    if (playButton.classList.contains("play")) playMusic();
  };
  const handleNext = () => {
    if (currentIdx === total - 1) {
      currentIdx = 0;
    } else {
      currentIdx += 1;
    }
    getMusic();
    if (playButton.classList.contains("play")) playMusic();
  };
  const handlePlay = async (e) => {
    const { target } = e;
    if (target.classList.contains("pause")) {
      target.innerText = " ⏸ ";
      modifyClassName(target, "pause", "play");
      playMusic();
    } else {
      target.innerText = "▶️";
      modifyClassName(target, "play", "pause");
      pauseMusic();
    }
  };
  const handleVolumeControll = (e) => {
    const { target } = e;
    volume = target.value;
    setVolume(volume);
  };
  const handleMute = () => {
    if (audio.muted) {
      audio.muted = false;
      setVolume(volume);
      volumeButton.innerText = "🔈";
    } else {
      audio.muted = true;
      volumeControll.value = 0;
      volumeButton.innerText = "🔇";
    }
  };

  const playMusic = async () => {
    await audio.play();
  };
  const pauseMusic = async () => {
    await audio.pause();
  };
  const getMusic = () => {
    music = getMusicInfo(currentIdx);
    audio.src = music.data.source;
    title.innerText = music.data.title;
    artist.innerText = music.data.singer;
    progressBar.style.width = "0%";
    checkType();
  };
  const handleTimeUpdate = (e) => {
    const { target } = e;
    const time = convertTimeFormat(parseInt(target.currentTime, 10)),
      progress = target.currentTime / target.duration;
    currentTime.innerText = time;
    progressBar.style.width = `${progress * 100}%`;
  };
  const handleLoadeData = (e) => {
    const { target } = e;
    totalTime.innerText = convertTimeFormat(parseInt(target.duration, 10));
    volumeControll.value = volume;
    target.volume = volume;
  };
  const handleEnded = (e) => {
    handleNext();
  };
  const handleResize = (e) => {
    checkType();
  };
  const init = () => {
    window.addEventListener("resize", handleResize);
    playButton.addEventListener("click", handlePlay);
    prevButton.addEventListener("click", handlePrev);
    nextButton.addEventListener("click", handleNext);
    progressBarContainer.addEventListener("click", handleProgress);
    volumeButton.addEventListener("click", handleMute);
    volumeControll.addEventListener("input", handleVolumeControll);

    //audio events
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadeData);
    audio.addEventListener("ended", handleEnded);

    getMusic();
  };
  init();
})();
