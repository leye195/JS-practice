const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { innerWidth, innerHeight } = window;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const gravity = 0.04;
const fraction = 0.99;
let particles = [];

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  update() {
    this.draw();
    this.velocity.x *= fraction;
    this.velocity.y *= fraction;

    this.velocity.y += gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.0025;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

function randomizeColor() {
  const r = randomIntFromRange(10, 245);
  const g = randomIntFromRange(10, 245);
  const b = randomIntFromRange(10, 245);
  return `rgb(${r},${g},${b})`;
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleResize() {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
}

function handleClick(e) {
  // init();

  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const particleCount = 400;
  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    const velocity = {
      x: Math.cos(angleIncrement * i) * randomIntFromRange(1, 4) * 3,
      y: Math.sin(angleIncrement * i) * randomIntFromRange(1, 4) * 3,
    };

    particles.push(
      new Particle(mouse.x, mouse.y, 5, randomizeColor(), velocity)
    );
  }
}

function init() {
  particles = [];
}

function animate() {
  requestAnimationFrame(animate);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(0,0,0,0.05)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, idx) => {
    if (particle.alpha > 0) {
      particle.update();
      return;
    }

    particles.splice(idx, 1);
  });
}

window.addEventListener("resize", handleResize);
window.addEventListener("click", handleClick);

handleResize();
animate();
