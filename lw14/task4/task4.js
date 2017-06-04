const COLOR_WHITE = "white";
const COLOR_BLACK = "black";
const COLOR_RED = "red";
const COLOR_GREEN = "green";

const FPS = 1000 / 60;

const GAME_WIDTH = 480;
const GAME_HEIGHT = 320;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 80;

const BALL_SIZE = 20;
const BALL_SPEED = 4;
const BALL_RADIUS = 12;

const ENEMY_SPEED = 4;

let g_context = null;

// Игровое поле
const g_game = new Rectangle(COLOR_WHITE, 0, 0, GAME_WIDTH, GAME_HEIGHT);

// Игрок и Противник
const g_enemy = new Rectangle(COLOR_BLACK, 0, g_game.height / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT);
const g_player = new Rectangle(COLOR_GREEN, g_game.width - PLAYER_WIDTH, g_game.height / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT);

// Мяч (стартует от противника)
let g_ball = new Circle(COLOR_RED, GAME_WIDTH / 2, GAME_HEIGHT / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);

function init() {
  const canvas = document.getElementById("canvas");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  g_context = canvas.getContext("2d");

  // скорость шарика
  g_ball.vX = -BALL_SPEED; // скорость по оси х
  g_ball.vY = BALL_SPEED; // скорость по оси у

  canvas.onmousemove = playerMove;
  setInterval(play, FPS);
}

function play() {
  draw(); //Рисуем объекты
  update(); //Расчитываем координаты
}

function draw() {
  g_game.draw();
  g_enemy.draw();
  g_player.draw();
  g_ball.draw();
}

function update() {
  // двигаем ракетку оппонента
  moveEnemy();

  // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
  if (g_ball.y < 0 || (g_ball.y + g_ball.height > g_game.height)) {
    g_ball.vY = -g_ball.vY;
    console.log(g_ball.y + g_ball.height, g_game.height);
  }

  // направляем шарик в противоположную сторону при соприкосновении со СТЕНАМИ игрового поля
  //Это условие не срабатывает, потому что оно считается за коллизию
  if (g_ball.x < 0 || (g_ball.x + g_ball.width > g_game.width)) {
    g_ball.vX = -g_ball.vX;
  }

  // Соприкосновение с ракетками
  if ((collision(g_enemy, g_ball) && g_ball.vX < 0) || (collision(g_player, g_ball) && g_ball.vX > 0)) {
    if (collision(g_player, g_ball) && g_ball.vX > 0){
      g_ball.vX = -1.5*g_ball.vX;
    } else {
      g_ball.vX = -g_ball.vX;
    }

  }

  // двигаем мячик на его скорость
  g_ball.x += g_ball.vX;
  g_ball.y += g_ball.vY;
}

// движение противника
function moveEnemy() {
  let y;
  if (g_ball.y < g_enemy.y + g_enemy.height / 2) {
    y = g_enemy.y - ENEMY_SPEED;
  }
  if (g_ball.y > g_enemy.y + g_enemy.height / 2) {
    y = g_enemy.y + ENEMY_SPEED;
  }

  //Убедимся, что новые координаты не выходят за рамки поля
  if ((y > 0) && (y < (g_game.height - g_enemy.height))) {
    g_enemy.y = y;
  }
}

// Проверка пересечений объектов (координата + ширина)
function collision(objA, objB) {
  let hasCollisionFromLeftX = (objA.x + objA.width > objB.x);
  let hasCollisionsFromRightX = (objA.x < objB.x + objB.width);
  let hasCollisionFromLeftY = (objA.y + objA.height > objB.y);
  let hasCollisionsFromRightY = (objA.y < objB.y + objB.height);
  return (hasCollisionFromLeftX && hasCollisionFromLeftY) && (hasCollisionsFromRightX && hasCollisionsFromRightY);
}

// движение игрока
function playerMove(event) {
  let y = event.pageY;
  // условие проверяет не выходит ли ракетка за пределы поля
  if ((g_player.height / 2 < y) && y < (g_game.height - g_player.height / 2)) {
    // привязываем положение мыши к середине ракетки
    g_player.y = y - g_player.height / 2;
  }
}

//Конструктор для прямоугольника
function Rectangle(color, x, y, width, height) {
  this.color = color; // цвет прямоугольника
  this.x = x; // координата х
  this.y = y; // координата у
  this.width = width; // ширина
  this.height = height; // высота
  // функция рисует прямоугольник согласно заданным параметрам
  this.draw = function () {
    g_context.fillStyle = this.color;
    g_context.fillRect(this.x, this.y, this.width, this.height);
  };
}

function Circle(color, x, y, width, height, radius) {
  this.color = color; // цвет круга
  this.x = x; // координата х
  this.y = y; // координата у
  this.width = width; // ширина
  this.height = height; // высота
  this.radius = radius;
  this.draw = function () {
    g_context.beginPath();
    g_context.fillStyle = this.color;
    g_context.arc(this.x, this.y, radius, 0, Math.PI * 2, true);
    g_context.fill();
  };
}