const example = document.getElementById("example");
const ctx = example.getContext('2d');

function drawFace() {
  ctx.beginPath();
  ctx.arc(500, 400, 100, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#f3df45';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#f3df45';
  ctx.stroke();
}

function drawEye(x, y) {
  ctx.beginPath();
  ctx.arc(x, 370, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(y, 375, 5, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
}

function drawMouth() {
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.moveTo(430, 425);
  ctx.bezierCurveTo(425, 425, 525, 420, 570, 425);
  ctx.moveTo(430, 425);
  ctx.quadraticCurveTo(495, 485, 570, 425);
  ctx.stroke();
}

function drawSmile() {
  drawFace();
  drawEye(470, 475);
  drawEye(530, 523);
  drawMouth();
}

drawSmile();
