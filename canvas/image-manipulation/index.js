const image = new Image();
image.src = "./image.jpeg";

function calculateRelativeBrightness(r, g, b) {
  return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 100;
}

image.addEventListener("load", function () {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const { innerWidth, innerHeight } = window;

  canvas.width = innerWidth / 2;
  canvas.height = innerHeight / 2;

  // image setting
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const particleCount = 5000;

  // get image pixel data
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let particles = [];
  let mappedImage = [];

  for (let y = 0; y < canvas.height; y++) {
    const row = [];

    for (let x = 0; x < canvas.width; x++) {
      // extract rgb data from pixel
      const r = pixels.data[y * 4 * pixels.width + x * 4];
      const g = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
      const b = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];

      // calculate relative brightness from rgb
      const brightness = calculateRelativeBrightness(r, g, b);

      const cell = [
        (cellBrightness = brightness),
        (cellColor = `rgb(${r},${g},${b})`),
      ];
      row.push(cell);
    }
    mappedImage.push(row);
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 3.5;
      this.size = Math.random() * 1.5 + 1;
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.angle = 0;
    }

    update() {
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);

      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        this.speed = mappedImage[this.position1][this.position2][0];
      }

      let movement = 2.5 - this.speed + this.velocity;
      this.angle += this.speed;

      ctx.globalCompositeOperation = "lignten";

      this.y += movement + Math.sin(this.angle) * 2.25;

      if (this.y >= canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }

      if (this.x >= canvas.width) {
        this.x = 0;
        this.y = Math.random() * canvas.height;
      }
    }

    draw() {
      ctx.beginPath();

      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        ctx.fillStyle = mappedImage[this.position1][this.position2][1];
      }

      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    paricles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.2;

    particles.forEach((particle) => {
      particle.update();
      ctx.globalAlpha = particle.speed * 0.25;
      particle.draw();
    });
  }

  init();
  animate();
});
