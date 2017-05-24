var example = document.getElementById("example");
ctx = example.getContext('2d');

function drawSmile() {
  ctx.beginPath(); //ЛИЦО
  ctx.arc(500, 400, 100, 0, 2*Math.PI, false);
  ctx.fillStyle = '#f3df45';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#f3df45';
  ctx.stroke();
  ctx.beginPath();  //ГЛАЗА
  ctx.arc(470, 370, 20, 0, 2*Math.PI, false);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(530, 370, 20, 0, 2*Math.PI, false);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.beginPath();  //ЗРАЧКИ
  ctx.arc(523, 375, 5, 0, 2*Math.PI, false);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(475, 375, 5, 0, 2*Math.PI, false);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  ctx.beginPath();   //РОТ
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.moveTo(430, 425);
  ctx.bezierCurveTo(425, 425, 525, 420, 570, 425);
  ctx.moveTo(430, 425);
  ctx.quadraticCurveTo(495, 485, 570, 425);
  ctx.stroke();
/*  ctx.beginPath();  //ЯЗЫК (не очень)
  ctx.moveTo(490, 445);
  ctx.bezierCurveTo(470, 500, 518, 500, 518, 445);
  ctx.lineWidth = 4;
  ctx.moveTo(490, 445);
  ctx.quadraticCurveTo(500, 455, 518, 445);
  ctx.strokeStyle = "#e45664";
  ctx.fillStyle = "#e45664";
  ctx.stroke();*/
}
drawSmile();
