const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const POINT_WIDTH = 3;
const POINT_HEIGHT = 3;

const coefficientA = 5;
const coefficientB = 10;
const coefficientC = -100;

function start() {
  const canvas = document.getElementById("canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  let x = 0;
  const ctx = canvas.getContext('2d');

  function drawSin() {
    ctx.fillStyle = "green";
    ctx.fillRect(CANVAS_WIDTH / 2 + x * coefficientB, CANVAS_HEIGHT / 2 - coefficientA * Math.pow(x, 2) - coefficientC, POINT_WIDTH, POINT_HEIGHT);
    ctx.fillRect(CANVAS_WIDTH / 2 - x * coefficientB, CANVAS_HEIGHT / 2 - coefficientA * Math.pow(x, 2) - coefficientC, POINT_WIDTH, POINT_HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, 2);
    ctx.fillRect(CANVAS_WIDTH / 2, 0, 2, CANVAS_HEIGHT);
    x = x + 0.05;
    requestAnimationFrame(drawSin);
  }

  drawSin();
}

start();