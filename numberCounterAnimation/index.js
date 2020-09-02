(() => {
  function numberCounter(target, number) {
    this.count = 0;
    this.diff = 0;
    this.targetCount = parseInt(number);
    this.targetFrame = target;
    this.timer = null;
    this.counter();
  }
  numberCounter.prototype.counter = function () {
    let self = this;
    this.diff = this.targetCount - this.count;
    if (this.diff > 0) self.count += Math.ceil(this.diff / 4);
    this.targetFrame.innerHTML = `${this.count
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    if (this.count < this.targetCount) {
      this.timer = setTimeout(() => {
        self.counter();
      }, 20);
    } else {
      clearTimeout(this.timer);
    }
  };
  const init = () => {
    new numberCounter(document.querySelector(".number"), 21565748);
  };
  window.addEventListener("DOMContentLoaded", init);
})();
