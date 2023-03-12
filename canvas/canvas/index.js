const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function toRadian(angle) {
  return (angle * Math.PI) / 180;
}

const handleResize = () => {
  const { innerWidth, innerHeight } = window;

  canvas.width = innerWidth / 2;
  canvas.height = innerHeight / 2;
};

window.addEventListener("resize", handleResize);
handleResize();

// transform
function case5() {
  function draw1() {
    ctx.fillRect(100, 100, 200, 200);
    ctx.fillStyle = "orange";
    ctx.fillRect(150, 150, 200, 200);

    ctx.save(); // ctx 상태 저장

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(300, 300, 50, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.restore(); // ctx 상태 복원

    ctx.beginPath();
    ctx.arc(300, 300, 25, 0, Math.PI * 2, false);
    ctx.fill();
  }

  function draw2() {
    ctx.fillRect(0, 0, 200, 200);
    ctx.save();

    ctx.fillStyle = "#0f9";
    ctx.fillRect(20, 20, 160, 160);
    ctx.save();

    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30, 30, 140, 140);

    ctx.restore(); // 이전 상태 복원
    ctx.fillRect(50, 50, 100, 100);

    ctx.restore(); // 초기 상태 복원
    ctx.fillRect(70, 70, 60, 60);
  }

  let x = canvas.width / 2 - 50;
  let y = canvas.height / 2 - 50;
  let scaleValue = 1;
  let angle = 0;

  function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // 변환 행렬 활용, 단위행렬
    ctx.setTransform(1, 0, 0, 1, 0, 0); // resetTransform();
    ctx.translate(x, y);
    ctx.scale(scaleValue, scaleValue);
    ctx.rotate(toRadian(angle));
    ctx.strokeRect(-50, -50, 100, 100);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();

    ctx.fillRect(10, 10, 30, 30);

    scaleValue += 0.025;
    angle += 1;

    requestAnimationFrame(draw);
  }

  draw();
}

//interaction
function case6() {
  let selectedBox = null;
  let timer = null;
  let step = 1;
  let panel = null;
  const boxList = [];
  const mouse = {
    x: null,
    y: null,
  };
  let oX = canvas.width / 2;
  let oY = canvas.height / 2;

  ctx.font = "bold 24px sans-serif";

  class Panel {
    constructor(size = 200, color = "#ffffff") {
      this.x = oX - size / 2;
      this.y = oY - size / 2;
      this.color = color;
      this.size = size;
      this.scale = 0;
      this.angle = 0;
      this.opacity = 0.25;
    }

    update() {
      // (목표크기 - 현재 크기)*0.1
      this.scale = this.scale + (1 - this.scale) * 0.08; //this.velocity;
      this.angle = 720 * this.scale;
      this.opacity += 0.02;

      this.draw();
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.translate(oX, oY);
      ctx.scale(this.scale, this.scale);
      ctx.rotate(toRadian(this.angle));
      ctx.translate(-oX, -oY); // 원점 복귀

      ctx.roundRect(this.x, this.y, this.size, this.size, 16);
      ctx.fill();

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    reset() {
      this.velocity = 0.025;
      this.scale = 0;
      this.opacity = 0.25;
    }

    showContents() {
      ctx.fillStyle = "#000000";
      ctx.fillText(selectedBox.index, oX, oY);
    }
  }

  class Box {
    constructor(x, y, size, velocity, index) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.velocity = velocity;
      this.opacity = 0.5;
      this.index = index;
    }

    update() {
      if (this.x > canvas.width) {
        this.x = -100;
      }

      this.x += this.velocity;

      this.draw();
    }

    draw() {
      ctx.beginPath();

      ctx.fillStyle = `rgba(0,0,0,${this.opacity})`;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        this.index,
        this.x + this.size / 2 - 6,
        this.y + this.size / 2
      );
      ctx.closePath();
    }
  }

  function init() {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * (canvas.width - 50) + 50;
      const y = Math.random() * (canvas.height - 50) + 50;

      boxList.push(new Box(x, y, 100, Math.random() * 4 + 2, i));
    }

    panel = new Panel(400, "rgb(205,240,255)");
  }

  function animate() {
    timer = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boxList.forEach((box) => {
      box.draw();
    });

    switch (step) {
      case 1:
        boxList.forEach((box) => {
          box.update();
        });
        break;
      case 2:
        panel.update();

        if (panel.scale >= 0.99) {
          panel.scale = 1;
          panel.angle = 720;
          step = 3;
        }
        break;

      case 3:
        panel.draw();
        panel.showContents();
        cancelAnimationFrame(timer);
        break;
    }
  }

  function handleClick(e) {
    const x = e.clientX;
    const y = e.clientY;

    mouse.x = x;
    mouse.y = y;

    boxList.forEach((box) => {
      const boxX = box.x;
      const boxY = box.y;
      const boxSize = box.size;

      if (x > boxX && x < boxX + boxSize && y > boxY && y < boxY + boxSize) {
        selectedBox = box;
      }
    });

    if (step === 1 && selectedBox) {
      step = 2;
    } else if (
      step === 3 &&
      (x < panel.x ||
        x > panel.x + panel.size ||
        y < panel.y ||
        y > panel.y + panel.size)
    ) {
      step = 1;
      panel.reset();
      selectedBox = null;
      animate();
    }
  }

  init();
  animate();

  canvas.addEventListener("click", handleClick);
}

//case5();
case6();
