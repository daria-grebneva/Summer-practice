var example = document.getElementById("example");
ctx = example.getContext('2d');

function drawHouse() {
  // Рисуем небо
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#7bc0dd";
  ctx.fillRect(0, 0, 1400, 500);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //Травка
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#487c39";
  ctx.fillRect(0, 500, 1400, 300);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //Основа домика
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#451e0b";
  ctx.fillRect(400, 200, 400, 400);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  //Типо сайдинга
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

  siding(200);
  //Окошки
  function window(x) {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#f6c2a7";
    ctx.fillRect(x, 280, 90, 110);
    ctx.fillRect(x + 150, 280, 90, 110);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  window(480);
  //Рама окошка
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

  windowFrame(480, 525, 480);
  //Труба
  function chimney() {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#2e1407";
    ctx.fillRect(440, 50, 50, 140);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  chimney();
  //Крыша
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
  //Облачка
  function drawCloud(x, y, z, color) {
    ctx.beginPath();
    ctx.arc(x, y, z, 0, 2 * Math.PI, false);
    ctx.arc(x - 50, y - 30, z + 10, 0, 2 * Math.PI, false);
    ctx.arc(x + 20, y - 80, z - 5, 0, 2 * Math.PI, false);
    ctx.arc(x + 70, y - 20, z + 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  drawCloud(170, 170, 50, '#ffffff');
  drawCloud(970, 170, 50, '#ffffff');
  //Кустики
  function drawPlants(x) {
    drawCloud(1020, x, 70, '#142310');
    drawCloud(1020, x+10, 60, '#294720');
    drawCloud(1020, x+20, 50, '#1e3518');
  }
  drawPlants(570);

}
drawHouse();