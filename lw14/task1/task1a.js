const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

function start() {
  const canvas = document.getElementById("canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  let xVertically = 75;
  let yVertically = 25;

  const ctx = canvas.getContext('2d');

  function animateCircleVertically() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(239,37,3,0.9)';
    ctx.arc(xVertically, yVertically, 22, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    yVertically = yVertically + 1;
    if (yVertically > CANVAS_HEIGHT - yVertically) {
      yVertically = 25;
    }
    requestAnimationFrame(animateCircleVertically);
  }

  animateCircleVertically();

}
start();