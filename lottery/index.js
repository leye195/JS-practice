const canvas = document.querySelector(".lottery1");
const canvas2 = document.querySelector(".lottery2");

function init() {
  if (canvas) {
    draw();
    drawPath1();
    drawPath2();
    drawColorPath();
  }
}

function draw() {
  const ctx = canvas.getContext("2d");

  ctx.fillRect(50, 50, 25, 25);
  ctx.strokeRect(25, 25, 50, 50);
  ctx.clearRect(60, 60, 10, 10);
}

function drawPath1() {
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(90, 90);
  ctx.lineTo(50, 90);
  ctx.lineTo(60, 80);
  ctx.lineTo(90, 90);
  ctx.closePath();

  ctx.stroke();
}

function drawPath2() {
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(100, 100, 25, 0, Math.PI * 2, true);
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 5, 0, Math.PI * 2, false);
  ctx.moveTo(90, 90);
  ctx.arc(90, 90, 5, 0, Math.PI * 2, true);
  ctx.closePath();

  ctx.stroke();
}

function drawColorPath() {
  const ctx = canvas2.getContext("2d");

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 40 * i)},${Math.floor(
        255 - 40 * j
      )},0)`;
      ctx.fillRect(j * 25 + 50, i * 25, 25, 25);
      /*ctx.strokeStyle = `rgb(${Math.floor(255 - 40 * i)},${Math.floor(
        255 - 40 * j
      )},0)`;
      ctx.strokeRect(j * 25 + 50, i * 25, 25, 25);*/
    }
  }

  ctx.globalAlpha = 0.15;

  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(125, 75, 5 + 5 * i, 0, Math.PI * 2);
    ctx.fill();
  }
}

init();
