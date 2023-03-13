// n! = n*(n-1)!
// https://www.youtube.com/watch?v=fcdNSZ9IzJM&ab_channel=TheCodingTrain
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector(".generate-tree-button");
let tree = null;
let trees = [];

function toRadian(angle) {
  return angle * (Math.PI / 180);
}

function handleClick() {
  for (let i = trees.length - 1; i >= 0; i--) {
    if (!trees[i].finished) {
      trees.push(trees[i].rightBranch());
      trees.push(trees[i].leftBranch());
    }
    trees[i].finished = true;
  }
}

class Branch {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.finished = false;
  }

  show() {
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }

  // vector rotate
  rotate(x, y, angle, mul = 1) {
    return {
      x: x * Math.cos(angle) - y * Math.sin(angle) * mul,
      y: x * Math.sin(angle) + y * Math.cos(angle) * mul,
    };
  }

  rightBranch() {
    const angle = Math.PI / (Math.random() * 22 + 11);
    const dir = this.rotate(
      this.end.x - this.start.x,
      this.end.y - this.start.y,
      angle,
      Math.random() * 0.25 + 0.5
    );
    const newStart = { ...this.end };
    const newEnd = {
      x: this.end.x + dir.x,
      y: this.end.y + dir.y,
    };

    return new Branch(newStart, newEnd);
  }

  leftBranch() {
    const angle = -Math.PI / (Math.random() * 22 + 11);
    const dir = this.rotate(
      this.end.x - this.start.x,
      this.end.y - this.start.y,
      angle,
      Math.random() * 0.25 + 0.5
    );
    const newStart = { ...this.end };
    const newEnd = {
      x: this.end.x + dir.x,
      y: this.end.y + dir.y,
    };

    return new Branch(newStart, newEnd);
  }
}

class Tree {
  constructor(x, y, len, angle, branchWidth) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.len = len;
    this.angle = angle;
    this.branchWidth = branchWidth;
  }

  draw(startX, startY, len, angle, branchWidth) {
    ctx.beginPath();
    ctx.save();

    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(toRadian(angle));
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    if (len < 4) {
      ctx.restore();
      return;
    }

    this.draw(0, -len, len * 0.73, angle + 12, branchWidth * 0.78);
    this.draw(0, -len, len * 0.73, angle - 12, branchWidth * 0.78);

    ctx.restore();
  }
}

function init() {
  //tree = new Tree(400, 400, 70, 0, 15);
  trees = [];

  const v1 = {
    x: canvas.width / 2,
    y: canvas.height,
  };

  const v2 = {
    x: canvas.width / 2,
    y: canvas.height - 150,
  };

  const root = new Branch(v1, v2);

  trees.push(root);
}

function handleResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
}

function animate() {
  //tree.draw(canvas.width / 2, canvas.height - 180, 100, 0, 1.5);

  trees.forEach((branch) => {
    branch.show();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", handleResize);
window.addEventListener("click", handleClick);

handleResize();
animate();
