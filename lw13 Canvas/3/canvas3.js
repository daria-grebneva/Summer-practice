const example = document.getElementById("example");
const ctx = example.getContext('2d');

function drawSky() {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#7bc0dd";
  ctx.fillRect(0, 0, 1400, 500);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawGrass() {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#487c39";
  ctx.fillRect(0, 500, 1400, 300);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawBaseHouse() {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#451e0b";
  ctx.fillRect(400, 200, 400, 400);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function siding(x) {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#5d290e";
  while (x != 600) {
    ctx.fillRect(400, x, 400, 20);
    x += 40;
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawWindow(x) {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#f6c2a7";
  ctx.fillRect(x, 280, 90, 110);
  ctx.fillRect(x + 150, 280, 90, 110);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function windowFrame(x, y, z) {
  ctx.beginPath();
  ctx.strokeStyle = "#451e0b";
  ctx.lineWidth = 5;
  ctx.strokeRect(x, 280, 90, 110);
  ctx.strokeRect(x + 150, 280, 90, 110);
  ctx.moveTo(y, 280);
  ctx.lineTo(y, 390);
  ctx.moveTo(y + 150, 280);
  ctx.lineTo(y + 150, 390);
  ctx.moveTo(z, 325);
  ctx.lineTo(z + 90, 325);
  ctx.moveTo(z + 150, 325);
  ctx.lineTo(z + 240, 325);
  ctx.closePath();
  ctx.stroke();
}

function chimney() {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#2e1407";
  ctx.fillRect(440, 50, 50, 140);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawRoof() {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#451e0b";
  ctx.moveTo(320, 250);
  ctx.lineTo(870, 250);
  ctx.lineTo(600, 50);
  ctx.lineTo(320, 250);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawCloud(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.arc(x - 50, y - 30, r + 10, 0, 2 * Math.PI, false);
  ctx.arc(x + 20, y - 80, r - 5, 0, 2 * Math.PI, false);
  ctx.arc(x + 70, y - 20, r + 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawPlants(x) {
  drawCloud(1020, x, 70, '#142310');
  drawCloud(1020, x + 10, 60, '#294720');
  drawCloud(1020, x + 20, 50, '#1e3518');
}

function drawHouse() {
  drawSky();
  drawGrass();
  drawBaseHouse();
  siding(200);
  drawWindow(480);
  windowFrame(480, 525, 480);
  chimney();
  drawRoof();
  drawCloud(170, 170, 50, '#ffffff');
  drawCloud(970, 170, 50, '#ffffff');
  drawPlants(570);
}

drawHouse();