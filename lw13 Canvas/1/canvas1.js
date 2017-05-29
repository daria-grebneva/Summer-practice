const example = document.getElementById("example");
const ctx = example.getContext('2d');

function drawTriangle() {
  ctx.beginPath();
  ctx.moveTo(500, 300);
  ctx.lineTo(500, 500);
  ctx.lineTo(300, 300);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(270, 500);
  ctx.lineTo(270, 300);
  ctx.lineTo(470, 500);
  ctx.lineTo(270, 500);
  ctx.stroke();
}
//drawTriangle(); //ЗАДАНИЕ 1а) ДВА ТРЕУГОЛЬНИКА

function flowerTriangle() {
  ctx.beginPath();
  ctx.moveTo(600, 600);
  ctx.lineTo(600, 400);
  ctx.lineTo(1000, 500);
  ctx.lineTo(600, 600);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(600, 600);
  ctx.lineTo(600, 400);
  ctx.lineTo(200, 500);
  ctx.lineTo(600, 600);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(500, 500);
  ctx.lineTo(700, 500);
  ctx.lineTo(600, 100);
  ctx.lineTo(500, 500);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(500, 500);
  ctx.lineTo(700, 500);
  ctx.lineTo(600, 900);
  ctx.lineTo(500, 500);
  ctx.stroke();
}

flowerTriangle();   //ЗАДАНИЕ 1б)  ЦВЕТОЧЕК ИЗ ТРЕУГОЛЬНИКОВ