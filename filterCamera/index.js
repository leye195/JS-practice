(() => {
  const video = document.querySelector(".player");
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  const strip = document.querySelector(".strip");
  const snap = document.querySelector(".snap");
  const filter = document.querySelector(".filter");
  const take = document.querySelector(".take");
  const buttonContainer = document.querySelector(".button-container");
  const photoBtn = buttonContainer.querySelector("button:last-child"),
    filterBtn = buttonContainer.querySelector("button:first-child");
  const filterCanvas = document.querySelectorAll(".filter canvas");
  const fctx = Array.of(...filterCanvas).map((c) => c.getContext("2d"));
  const loading = document.querySelector(".loading");

  const links = document.querySelectorAll("ul li");
  const highlight = document.createElement("span");

  let mainType = "normal";

  const initHighlight = () => {
    highlight.classList.add("highlight");
    document.body.appendChild(highlight);
    moveHighlight(links[0].getBoundingClientRect());
    links.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        const { target } = e;
        moveHighlight(target.getBoundingClientRect());
      });
    });
  };
  const moveHighlight = ({ width, height, top, left }) => {
    highlight.style.cssText = `width:${width}px; height:${height}px; transform:translate(${left}px,${top}px)`;
  };
  const getVideo = () => {
    //get Video screen
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((localMediaStream) => {
        const source = new MediaStream(localMediaStream);
        if ("srcObject" in video) {
          video.srcObject = source;
        } else {
          video.src = URL.createObjectURL(source);
        }
        video.play();
      })
      .catch((e) => {
        console.error(`Error:`, e);
      });
  };
  const paintToFilterCanvas = (width, height) => {
    fctx.forEach((c) => {
      c.width = width;
      c.height = height;
    });
    fctx.forEach((ctx, idx) => {
      ctx.drawImage(video, 0, 0, 300, 150);
      let pixels = ctx.getImageData(0, 0, 300, 150);
      if (idx === 1) {
        pixels = effect(pixels, "red");
        ctx.putImageData(pixels, 0, 0);
      } else if (idx === 2) {
        pixels = effect(pixels, "blue");
        ctx.putImageData(pixels, 0, 0);
      } else if (idx === 3) {
        pixels = effect(pixels, "green");
        ctx.putImageData(pixels, 0, 0);
      } else if (idx === 4) {
        pixels = effect(pixels, "gray");
        ctx.putImageData(pixels, 0, 0);
      } else if (idx === 5) {
        pixels = effect(pixels, "invert");
        ctx.putImageData(pixels, 0, 0);
      } else if (idx === 6) {
        pixels = effect(pixels, "sepia");
        ctx.putImageData(pixels, 0, 0);
      } else {
        pixels = effect(pixels, "normal");
        ctx.putImageData(pixels, 0, 0);
      }
    });
  };
  const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    fctx.forEach((c) => {
      c.width = width;
      c.height = height;
    });
    setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      let pixels = ctx.getImageData(0, 0, width, height);
      pixels = effect(pixels, mainType);
      ctx.putImageData(pixels, 0, 0);
      paintToFilterCanvas(width, height);
    }, 16);
  };

  const effect = (pixels, type) => {
    if (type === "red") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 90; //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
      }
    } else if (type === "blue") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] - 120; //red
        pixels.data[i + 1] = pixels.data[i + 1] * 0.9; //green
        pixels.data[i + 2] = pixels.data[i + 2] + 100; //blue
      }
    } else if (type === "green") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] - 100; //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
      }
    } else if (type === "gray") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        const avg =
          (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
        pixels.data[i + 0] = avg; //red
        pixels.data[i + 1] = avg; //green
        pixels.data[i + 2] = avg; //blue
      }
    } else if (type === "invert") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = 255 - pixels.data[i + 0]; //red
        pixels.data[i + 1] = 255 - pixels.data[i + 1]; //green
        pixels.data[i + 2] = 255 - pixels.data[i + 2]; //blue
        pixels.data[i + 3] = pixels.data[i + 3] * 0.9;
      }
    } else if (type === "sepia") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i],
          g = pixels.data[i + 1],
          b = pixels.data[i + 2];
        pixels.data[i + 0] = r * 0.3582 + g * 0.7044 + b * 0.1368; //red
        pixels.data[i + 1] = r * 0.299 + g * 0.5877 + b * 0.114; //green
        pixels.data[i + 2] = r * 0.2392 + g * 0.4693 + b * 0.0912; //blue
      }
    } else if (type === "normal") {
      for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i],
          g = pixels.data[i + 1],
          b = pixels.data[i + 2];
        pixels.data[i + 0] = r; //red
        pixels.data[i + 1] = g; //green
        pixels.data[i + 2] = b; //blue
      }
    }
    return pixels;
  };

  const handleClick = (e) => {
    const {
      target: { dataset },
      target,
    } = e;
    if (dataset.type === "photo") {
      target.classList.add("active");
      strip.classList.remove("hidden");
      filter.classList.add("hidden");
      filterBtn.classList.remove("active");
    } else if (dataset.type === "filter") {
      target.classList.add("active");
      strip.classList.add("hidden");
      filter.classList.remove("hidden");
      photoBtn.classList.remove("active");
    }
  };

  const takePhoto = () => {
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    const name = Math.floor(Math.random() * 10000 + 10).toString();
    link.href = data;
    link.setAttribute("download", `img${name}`);
    link.innerHTML = `<img class="snapshot" src="${data}"/>`;
    strip.insertBefore(link, strip.firstChild);
    snap.currentTime = 0;
    snap.play();
  };

  const changeFilter = (e) => {
    const {
      target: { dataset },
      target,
      currentTarget,
    } = e;
    let node = target;
    const nodes = currentTarget.querySelectorAll("p");
    while (!node.classList.contains("canvas-wrapper")) {
      node = node.parentNode;
    }
    node = node.querySelector("p");
    nodes.forEach((node) => node.classList.remove("opacity-effect"));
    node.classList.add("opacity-effect");
    mainType = dataset.type;
  };
  const init = () => {
    getVideo();
    initHighlight();
    video.addEventListener("canplay", () => {
      paintToCanvas();
      loading.classList.add("done");
    });
    buttonContainer.addEventListener("click", handleClick);
    take.addEventListener("click", takePhoto);
    filter.addEventListener("click", changeFilter);
  };
  window.addEventListener("DOMContentLoaded", init);
})();
