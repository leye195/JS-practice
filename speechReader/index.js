(() => {
  const msg = new SpeechSynthesisUtterance();
  const voiceDropDown = document.querySelector(".voices");
  const read = document.querySelector("#read"),
    stop = document.querySelector("#stop"),
    textarea = document.querySelector("textarea");
  let voices = [];
  const populateVoices = (e) => {
    const { target } = e;
    voices = target.getVoices(); //get voice list
    voiceDropDown.innerHTML = `${voices
      .map(
        (voice) =>
          `<option value="${voice.name}" data-lang="${voice.lang}" data-uri="${voice.voiceURI}">${voice.name} (${voice.lang})</option>`
      )
      .join("")}`;
  };
  const setVoice = (e) => {
    const {
      target: { value },
    } = e;
    msg.voice = voices.find((voice) => voice.name === value);
  };
  const handleTextChange = (e) => {
    const {
      target: { value },
    } = e;
    msg.text = value;
  };

  const handleRead = (e) => {
    speechSynthesis.speak(msg);
  };

  const handleStop = (e) => {
    speechSynthesis.cancel();
  };
  const init = () => {
    speechSynthesis.addEventListener("voiceschanged", populateVoices);
    msg.text = textarea.value;
    voiceDropDown.addEventListener("change", setVoice);
    textarea.addEventListener("change", handleTextChange);
    read.addEventListener("click", handleRead);
    stop.addEventListener("click", handleStop);
  };
  init();
})();
