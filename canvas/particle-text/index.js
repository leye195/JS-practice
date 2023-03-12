const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { innerWidth, innerHeight } = window;
const mouse = {
  x: 0,
  y: 0,
  radius: 50,
};
const particleCount = 1100;
let particles = [];

ctx.font = "30px Verdana";
ctx.fillText("A", 0, 40);
ctx.fill();

const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = mouse.radius;
    const forceDirectionX = distance / dx;
    const forceDirectionY = distance / dy;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        dx = this.x - this.baseX;
        this.x -= dx / 10;
      }

      if (this.y !== this.baseY) {
        dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function handleResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  mouse.x = canvas.width / 2;
  mouse.y = canvas.height / 2;

  init();
}

function handleMouseMove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function init() {
  particles = [];

  // get coordinates from text
  for (let y = 0; y < textCoordinates.height; y++) {
    for (let x = 0; x < textCoordinates.width; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        particles.push(new Particle((x + 30) * 20, (y + 10) * 20, 3));
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

function connect() {
  let opacity = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      opacity = 1 - distance / 50;

      if (distance < 45) {
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// text data

window.addEventListener("resize", handleResize);
window.addEventListener("mousemove", handleMouseMove);
handleResize();

animate();
