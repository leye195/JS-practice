const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { innerWidth, innerHeight } = window;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const particleCount = 40;
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
    this.alpha = 0.8;
  }

  update() {
    this.draw();
  }

  draw() {
    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 50;
    ctx.lineCap = "round";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "black";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + canvas.height / 2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
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

function init() {
  particles = [];

  let x = 0;
  let y = 0;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(x, y, 5, `rgba(245,100,24,0.8`));

    if (x < canvas.width) {
      x += randomIntFromRange(120, 200);
    } else {
      x = 0;
      y += randomIntFromRange(200, 300);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(0,0,0,0.05)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

window.addEventListener("resize", handleResize);

handleResize();
animate();
