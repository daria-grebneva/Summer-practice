const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

function start() {
  const canvas = document.getElementById("canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  let xDiagonal = 75;
  let yDiagonal = 25;

  const ctx = canvas.getContext('2d');

  function animateCircleDiagonal() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(239,37,3,0.9)';
    ctx.arc(xDiagonal, yDiagonal, 22, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    yDiagonal = yDiagonal + 1;
    xDiagonal = xDiagonal + 1;
    if ((yDiagonal > CANVAS_HEIGHT - yDiagonal) && (xDiagonal > CANVAS_HEIGHT - xDiagonal)) {
      yDiagonal = 25;
      xDiagonal = 75;
    }
    requestAnimationFrame(animateCircleDiagonal);
  }

  animateCircleDiagonal();

}
start();