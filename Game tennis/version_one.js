const GAME_COLOR = ' 	#ffffff';

const PLAYER_COLOR = '#53c9cc';
const ENEMY_COLOR = '#f3b3ff';
const ENEMY_SPEED = 8;

const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 150;

const BALL_SIZE = 40;
const BALL_SPEED = 4;
const MAX_SPEED = 10;
const BALL_RADIUS = 20;
const BALL_COLOR = '#183c3d';

const END_SCORE = 2;
const BACKGROUND_COLOR = '#ffffff';
const FONT_COLOR = '#53c9cc';
const SCORE_COLOR = '#183c3d';

const TEXT_FONT = 'bold 70px lobster';
const SCORE_FONT = '50px lobster';
const WINNER_FONT = 'bold 50px lobster';

class init {
  constructor() {
    const canvas = document.getElementById("canvas");
    let g_context = null;
    g_context = canvas.getContext("2d");
    let start = false;
    let playerWin = true;
    let numberOfGames = 0;
    canvasParams();
    canvas.onclick = startGame;


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
    g_enemy.form(ENEMY_COLOR, canvas.width / 2 - PLAYER_HEIGHT / 2, 0, PLAYER_WIDTH, PLAYER_HEIGHT);
    g_enemy.scores = 0;
    g_player.scores = 0;


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
    g_ball.vX = 0; // скорость по оси х
    g_ball.vY = 0; // скорость по оси у


    function canvasParams() {
      canvas.width = 0.9 * window.innerWidth;
      canvas.height = 0.9 * window.innerHeight;
      requestAnimationFrame(canvasParams)
    }

    function startGame() {
      if (!start) {

        g_ball.vX = -BALL_SPEED; // скорость по оси х
        g_ball.vY = BALL_SPEED; // скорость по оси у
        start = true;
      }
    }

    function draw() {
      g_game.draw();
      g_player.draw();
      g_enemy.draw();
      g_ball.draw();
      g_context.fillStyle = SCORE_COLOR;
      g_context.font = SCORE_FONT;
      g_context.fillText('ENEMY: ' + g_enemy.scores, 100, 100);
      g_context.fillText('PLAYER: ' + g_player.scores, 100, g_game.height - 150);
      if (!start) {
        g_context.fillStyle = BACKGROUND_COLOR;
        g_context.globalAlpha = 1;
        g_context.fillRect(0, 0, canvas.width, canvas.height);
        g_context.fillStyle = FONT_COLOR;
        g_context.font = TEXT_FONT;
        g_context.fillText('GAME TENNIS', 40, 80);
        g_context.textBaseline = 'top';
        if (numberOfGames > 0) {
          showWinner();
        }
      }
    }

    function play() {
      draw();
      update();
      requestAnimationFrame(play);
    }

    function playerMove(event) {
      if (start) {
        let x = event.pageX;
        // условие проверяет не выходит ли ракетка за пределы поля
        if ((g_player.width / 2 < x) && x < (g_game.width - g_player.width / 2)) {
          // привязываем положение мыши к середине ракетки
          g_player.x = x - g_player.width / 2;
        }
      }

    }

    function update() {
      // двигаем ракетку оппонента
      moveEnemy();

      // направляем шарик в противоположную сторону при соприкосновении с ПОЛОМ или ПОТОЛКОМ игрового поля
      if (g_ball.y - g_ball.height / 2 < 0) {
        g_ball.vY = -g_ball.vY;
        g_player.scores++;
      }
      if (g_ball.y + g_ball.height / 2 > g_game.height) {
        g_ball.vY = -g_ball.vY;
        g_enemy.scores++;
      }

      // направляем шарик в противоположную сторону при соприкосновении со СТЕНАМИ игрового поля
      if ((g_ball.x - g_ball.width / 2 < 0) || (g_ball.x + g_ball.width / 2 > g_game.width)) {//+ g_ball.width
        g_ball.vX = -g_ball.vX;
      }

      // Соприкосновение с ракетками
      if ((collision(g_enemy, g_ball) && g_ball.vY < 0) || (collision(g_player, g_ball) && g_ball.vY > 0)) {
        console.log('collision');
        if (g_ball.vY < MAX_SPEED && -MAX_SPEED < g_ball.vY) {
          if (g_ball.vX < 0) {
            g_ball.vY--;
          } else {
            g_ball.vY++;
          }
          if (g_ball.vX < 0) {
            g_ball.vX--;
          } else {
            g_ball.vX++;
          }
        }
        g_ball.vY = -g_ball.vY;
      }
      if (g_enemy.scores === END_SCORE || g_player.scores === END_SCORE) {
        if (g_enemy.scores === END_SCORE) {
          start = false;
          playerWin = false;
        } else {
          playerWin = true;
          start = false;
        }
        numberOfGames++;
        g_ball.x = g_player.width + g_ball.width;
        g_ball.y = g_game.height / 2 - g_ball.width / 2;
        g_ball.vX = 0;
        g_ball.vY = 0;
        g_enemy.scores = 0;
        g_player.scores = 0;
      }

      g_ball.x += g_ball.vX;
      g_ball.y += g_ball.vY;

    }

    function showWinner() {
      let text = '';
      if (!playerWin) {
        text = 'YOUR ENEMY IS'
      } else {
        text = 'YOU ARE'
      }
      g_context.fillStyle = SCORE_COLOR;
      g_context.font = WINNER_FONT;
      g_context.fillText(text + ' A WINNER', 40, 240);
      g_context.textBaseline = 'top';
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
      g_enemy.vX = g_ball.vX;
      g_enemy.vY = g_ball.vY;
    }

    canvas.onmousemove = playerMove;
    requestAnimationFrame(play);
  }

}

const game = new init();