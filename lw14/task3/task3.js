const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const SUN_TO_EARTH_DISTANCE = 90;
const SUN_TO_VENUS_DISTANCE = 50;
const FPS = 1000 / 60; //60

let g_ctx = null;

let g_sun = new Image();
g_sun.src = 'img/sun.png';
let g_earth = new Image();
g_earth.src = 'img/earth.png';
let g_venus = new Image();
g_venus.src = 'img/venus.png';


let g_earthRotationAngle = 0;
let g_venusRotationAngle = 0;

function start() {
  g_ctx = document.getElementById('canvas').getContext('2d');
  g_ctx.globalCompositeOperation = 'destination-over';
  g_ctx.fillStyle = 'rgba(0,0,0,0.4)';
  g_ctx.strokeStyle = 'rgba(0,153,255,0.4)';

  requestAnimationFrame(draw, FPS)
}

function draw() {
  g_ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear canvas
  drawEarth();
  drawOrbit();
  drawVenus();
  drawNewOrbit();
  drawSun();
  requestAnimationFrame(draw, FPS);
}

function drawSun() {
  g_ctx.drawImage(g_sun, 0, 0, 300, 300);
}

function drawOrbit() {
  g_ctx.beginPath();
  g_ctx.arc(150, 150, 70, 0, Math.PI * 2, false);
  g_ctx.stroke();
}

function drawNewOrbit() {
  g_ctx.beginPath();
  g_ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
  g_ctx.stroke();
}

function drawEarth() {
  g_ctx.save();
  g_ctx.translate(150, 150);
  g_ctx.rotate(degreesToRadians(g_earthRotationAngle));
  processEarthAngle();
  g_ctx.drawImage(g_earth, SUN_TO_EARTH_DISTANCE, 0);
  g_ctx.restore();
}

function drawVenus() {
  g_ctx.save();
  g_ctx.translate(150, 150);
  g_ctx.rotate(degreesToRadians(g_venusRotationAngle));
  processVenusAngle();
  g_ctx.drawImage(g_venus, SUN_TO_VENUS_DISTANCE, 0);
  g_ctx.restore();
}

function degreesToRadians(num) {
  return num * Math.PI / 180;
}

function processVenusAngle() {
  g_venusRotationAngle += 3;
  if (g_earthRotationAngle > 360) {
    g_venusRotationAngle = 0;
  }
}

function processEarthAngle() {
  g_earthRotationAngle += -1;
  if (g_earthRotationAngle > 360) {
    g_earthRotationAngle = 0;
  }
}
