const GAME_COLOR = '#ffffff';

const PLAYER_COLOR = '#d8b2d8';
const ENEMY_COLOR = '#564756';
const ENEMY_SPEED = 4;

const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 150;

const BALL_SIZE = 40;
const BALL_SPEED = 4;
const BALL_RADIUS = 20;
const BALL_COLOR = 'black';


class init {
  constructor() {
    const canvas = document.getElementById("canvas");
    canvas.width = 0.9 * window.innerWidth;
    canvas.height = 0.9 * window.innerHeight;
    let g_context = null;
    g_context = canvas.getContext("2d");

    class Rectangle {
      form(color, x, y, width, height) {
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
    }
    const g_game = new Rectangle();
    g_game.form(GAME_COLOR, 0, 0, canvas.width, canvas.height);
    const g_player = new Rectangle();
    g_player.form(PLAYER_COLOR, canvas.width / 2 - PLAYER_HEIGHT / 2, canvas.height - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
    const g_enemy = new Rectangle();
    g_enemy.form(ENEMY_COLOR, g_game.width / 2 - PLAYER_HEIGHT / 2, 0, PLAYER_WIDTH, PLAYER_HEIGHT);

    class Circle {
      form(color, x, y, width, height, radius) {
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
    }

    const g_ball = new Circle();
    g_ball.form(BALL_COLOR, canvas.width / 2, canvas.height / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);
    g_ball.vX = -BALL_SPEED; // скорость по оси х
    g_ball.vY = BALL_SPEED; // скорость по оси у


    function draw() {
      g_game.draw();
      g_player.draw();
      g_enemy.draw();
      g_ball.draw();
    }

    function play() {
      draw();
      update();
    }

    function playerMove(event) {
      let x = event.pageX;
      // условие проверяет не выходит ли ракетка за пределы поля
      if ((g_player.width / 2 < x) && x < (g_game.width - g_player.width / 2)) {
        // привязываем положение мыши к середине ракетки
        g_player.x = x - g_player.width / 2;
      }
    }

    function update() {
      // двигаем ракетку оппонента
      moveEnemy();

      // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
      if ((g_ball.y - g_ball.height / 2 < 0) || (g_ball.y + g_ball.height / 2 > g_game.height)) {
        g_ball.vY = -g_ball.vY;
        console.log('пол или потолок');
      }

      // направляем шарик в противоположную сторону при соприкосновении со СТЕНАМИ игрового поля
      if (g_ball.x - g_ball.width / 2 < 0 || (g_ball.x + g_ball.width / 2 > g_game.width)) {//+ g_ball.width
        g_ball.vX = -g_ball.vX;
      }

      // Соприкосновение с ракетками
      if ((collision(g_enemy, g_ball) && g_ball.vY < 0) || (collision(g_player, g_ball) && g_ball.vY > 0)) {
        console.log('collision');
        g_ball.vY = -g_ball.vY;
        /*        if (collision(g_player, g_ball) && g_ball.vY > 0) {
         g_ball.vY = -(g_ball.vY + Math.pow(g_ball.vY, 0.5));
         } else {
         g_ball.vY = -g_ball.vY;
         }*/
      }

      g_ball.x += g_ball.vX;
      g_ball.y += g_ball.vY;

    }

    function collision(objA, objB) {
      let hasCollisionFromUpY = (objA.y + objA.height + objB.height / 2 > objB.y);
      let hasCollisionsFromDownY = (objA.y < objB.y + objB.height / 2);
      let hasCollisionFromLeftX = (objA.x + objA.width > objB.x);
      let hasCollisionsFromRightX = (objA.x < objB.x + objB.width);
      return (hasCollisionFromUpY) && (hasCollisionsFromDownY) && (hasCollisionFromLeftX) && (hasCollisionsFromRightX);
    }

    function moveEnemy() {
      let x;
      if (g_ball.x < g_enemy.x + g_enemy.width / 2) {
        x = g_enemy.x - ENEMY_SPEED;
      }
      if (g_ball.x > g_enemy.x + g_enemy.width / 2) {
        x = g_enemy.x + ENEMY_SPEED;
      }
      if ((x > 0) && (x < (g_game.width - g_enemy.width ))) {
        g_enemy.x = x;//
      }
    }


    canvas.onmousemove = playerMove;
    //TODO:: переделать на requestAnimationFrame()
    //TODO:: спросить можно ли использовать функции
    setInterval(play, 1000 / 20);
    /*function setTime() {
     for (setTime = 1; setTime <= 5; setTime = setTime + 1) {
     }
     requestAnimationFrame(play)
     }

     setTime();*/
    //requestAnimationFrame(play)
  }

}

const game = new init();
//game.Rectangle(GAME_COLOR, 0, 0, canvas.width, canvas.height);