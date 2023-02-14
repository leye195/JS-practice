(function () {
  let step = -1;
  let modal = document.querySelector(".modal");

  const body = document.body;
  const overlay = document.querySelector(".overlay");
  const demoButton = document.querySelector(".live-demo");

  const steps = [
    {
      class: ".main-title",
      text: "This is Main Title",
    },
    {
      class: ".get-started",
      text: "Get Started Button",
    },
    {
      class: ".card",
      text: "Card",
    },
  ];

  function getOffset(element, relativeEle) {
    const body = document.body;
    relativeEle = relativeEle || body;

    const rect = element.getBoundingClientRect();

    const obj = {
      width: rect.width,
      height: rect.height,
    };

    // {width: 0, height: 0, top: -2524, left: 25}

    return Object.assign(obj, {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }

  function createModal(target, text) {
    if (modal) {
      const targetPosition = getOffset(target);
      const modalPosition = getOffset(modal);

      const top = targetPosition.top - modalPosition.height;
      const left = targetPosition.left + targetPosition.width / 2;
      modal.style.cssText = `top:${top}px;left:${left}px`;
      modal.innerHTML = `<div class="arrow bottom"></div>${text}`;
      return;
    }

    modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `<div class="arrow bottom"></div>${text}`;
    body.appendChild(modal);

    const targetPosition = getOffset(target);
    const modalPosition = getOffset(modal);

    const top = targetPosition.top - modalPosition.height;
    const left = targetPosition.left + targetPosition.width / 2;
    modal.style.cssText = `top:${top}px;left:${left}px`;
  }

  function handleNextStep() {
    const prevElem =
      step > -1 ? document.querySelector(steps[step].class) : null;

    if (step >= steps.length - 1) {
      prevElem.classList.remove("tour-element");
      overlay.classList.toggle("overlay-visible");
      step = -1;
      modal.remove();
      modal = null;
      return;
    }
    // {width: 363.29168701171875, height: 57.333335876464844, top: 16, left: 485.6875}

    const currentElem = document.querySelector(steps[step + 1].class);

    if (prevElem) {
      prevElem.classList.remove("tour-element");
      prevElem.removeEventListener("click", handleNextStep);
    }

    if (currentElem) {
      currentElem.classList.add("tour-element");
      currentElem.addEventListener("click", handleNextStep);
      createModal(currentElem, steps[step + 1].text);
    }

    step++;
  }

  function handleLiveDemo() {
    if (!overlay.classList.contains("overlay-visible")) {
      handleNextStep();
    }

    overlay.classList.toggle("overlay-visible");
  }

  function addEvents() {
    demoButton.addEventListener("click", handleLiveDemo);
  }

  addEvents();
})();
