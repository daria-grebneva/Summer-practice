const GAME_COLOR = ' 	#ffffff';

const PLAYER_COLOR = '#53c9cc';
const ENEMY_COLOR = '#cc5653';
const ENEMY_SPEED = 8;

const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 150;

const BALL_SIZE = 40;
const BALL_SPEED = 4;
const MAX_SPEED = 10;
const BALL_RADIUS = 20;
const BALL_COLOR = '#000000';

const END_SCORE = 2;
const BACKGROUND_COLOR = '#ffffff';
const FIELD_COLOR = '#17181a';
const FONT_COLOR = '#53c9cc';
const SCORE_COLOR = '#183c3d';

const TEXT_FONT = 'bold 70px lobster';
const SCORE_FONT = '35px lobster';
const WINNER_FONT = 'bold 55px lobster';
const CONTINUE_FONT = 'bold 35px lobster';

class Rectangle {
  constructor(context, x, y, width, height, color) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._context = context;
    this._color = color;
  }

}
class Player extends Rectangle {
  constructor(context, x, y, width, height, color) {
    super(context, x, y, width, height, color);
    this._score = 0;
  }

  draw() {
    this._context.fillStyle = this._color;
    this._context.fillRect(this._x, this._y, this._width, this._height);
  }
}

class Field extends Rectangle {
  constructor(context, x, y, width, height, color) {
    super(context, x, y, width, height, color);
  }

  draw(x_value, y_value, width, height) {
    this._context.fillStyle = this._color;
    this._context.fillRect(x_value, y_value, width, height);
  }
}


class Circle {
  constructor(context, color, x, y, width, height, radius) {
    this._color = color; // цвет круга
    this._x = x; // координата х
    this._y = y; // координата у
    this._width = width; // ширина
    this._height = height; // высота
    this._radius = radius;
    this._context = context;
    this.vX = 0;
    this.vY = 0;
  }

  draw() {
    this._context.beginPath();
    this._context.fillStyle = this._color;
    this._context.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
    this._context.fill();
  }
}

class Game {
  constructor() {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._background = new Image();
    this._background.src = 'img/background_1.jpg';
    this._start = false;
    this._playerWin = true;
    this._numberOfGames = 0;
    this.x_value = this._canvas.width / 4.7;
    this.y_value = this._canvas.height / 7.5;
    this.width_value = 0.564 * this._canvas.width;
    this.height_value = 0.67 * this._canvas.height;
    this._filed = new Field(this._context, window.innerWidth / 5.2, window.innerHeight / 5.5, 0.9 * window.innerWidth, 0.9 * window.innerHeight, BACKGROUND_COLOR);
    this._enemy = new Player(this._context, this._canvas.width + this.x_value, this.y_value * 5.7, PLAYER_WIDTH, PLAYER_HEIGHT, ENEMY_COLOR);
    this._player = new Player(this._context, this._canvas.width + this.x_value, this._canvas.height + (this._canvas.height + this.height_value) * 2.02, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR);
    this._ball = new Circle(this._context, BALL_COLOR, window.innerWidth / 3, window.innerHeight / 2.5, BALL_SIZE, BALL_SIZE, BALL_RADIUS);

    this._canvas.addEventListener("mousemove", (event) => {
      this.playerMove(event, this._player._width, this.width_value, this.x_value);
    });
    this._canvas.onclick = (event) => {
      this._startGame();
    };
    requestAnimationFrame(this.onLoop.bind(this));
  }

  playerMove(event, player_width, filed_width, filed_x) {
    if (this._start) {
      let x = event.pageX;
      // условие проверяет не выходит ли ракетка за пределы поля
      if ((filed_x + player_width / 2 < x) && x < (filed_x + filed_width - player_width / 2)) {
        // привязываем положение мыши к середине ракетки
        this._player._x = x - player_width / 2;
      }
    }
  }

  _startGame() {
    if (!this._start) {
      this._ball.vX = -BALL_SPEED; // скорость по оси х
      this._ball.vY = BALL_SPEED; // скорость по оси у
      this._start = true;
    }
  }

  _moveEnemy() {
    let x;
    if (this._ball._x < this._enemy._x + this._enemy._width / 2) {
      x = this._enemy._x - ENEMY_SPEED;
    }
    if (this._ball._x > this._enemy._x + this._enemy._width / 2) {
      x = this._enemy._x + ENEMY_SPEED;
    }
    if (x > (this.x_value) && (x < (this.width_value + this.x_value - this._enemy._width))) {//
      this._enemy._x = x;
    }
    this._enemy.vX = this._ball.vX;
    this._enemy.vY = this._ball.vY;
  }

  collision(objA, objB) {
    let hasCollisionFromUpY = (objA._y + objA._height + objB._height / 2 > objB._y);
    let hasCollisionsFromDownY = (objA._y < objB._y + objB._height / 2);
    let hasCollisionFromLeftX = (objA._x + objA._width > objB._x);
    let hasCollisionsFromRightX = (objA._x < objB._x + objB._width);
    return (hasCollisionFromUpY) && (hasCollisionsFromDownY) && (hasCollisionFromLeftX) && (hasCollisionsFromRightX);
  }

  _update() {
    this.x_value = this._canvas.width / 4.7;
    this.y_value = this._canvas.height / 7.5;
    this.width_value = 0.564 * this._canvas.width;
    this.height_value = 0.67 * this._canvas.height;
    this._canvas.width = 0.9 * window.innerWidth;
    this._canvas.height = 0.9 * window.innerHeight;
    this._moveEnemy();
    if (this._ball._y - this._ball._height / 2 < ((this._canvas.height - this.height_value) / 2 - this._ball._height * 0.7 )) {
      this._ball.vY = -this._ball.vY;
      this._player._score++;
    }
    if (this._ball._y + this._ball._height / 2 > (this._canvas.height - (this._canvas.height - this.height_value) / 2 - this._ball._height * 0.6 )) {
      this._ball.vY = -this._ball.vY;
      this._enemy._score++;
    }

    // направляем шарик в противоположную сторону при соприкосновении со СТЕНАМИ игрового поля
    if ((this._ball._x - this._ball._width / 2 < (this._canvas.width - this.width_value) / 2 - this._ball._width * 0.3)
      || (this._ball._x + this._ball._width / 2 > (this._canvas.width - (this._canvas.width - this.width_value) / 2 - this._ball._width * 0.2))) {//+ g_ball.width
      this._ball.vX = -this._ball.vX;
    }

    // Соприкосновение с ракетками
    if ((this.collision(this._enemy, this._ball) && this._ball.vY < 0) || (this.collision(this._player, this._ball) && this._ball.vY > 0)) {
      if (this._ball.vY < MAX_SPEED && -MAX_SPEED < this._ball.vY) {
        if (this._ball.vX < 0) {
          this._ball.vY--;
        } else {
          this._ball.vY++;
        }
        if (this._ball.vX < 0) {
          this._ball.vX--;
        } else {
          this._ball.vX++;
        }
      }
      this._ball.vY = -this._ball.vY;
    }

    if (this._enemy._score === END_SCORE || this._player._score === END_SCORE) {
      if (this._enemy._score === END_SCORE) {
        this._start = false;
        this._playerWin = false;
      } else {
        this._playerWin = true;
        this._start = false;
      }
      this._numberOfGames++;
      this._enemy._score = 0;
      this._player._score = 0;
      this._ball._x = window.innerWidth / 3;//(this.width_value + this.x_value) * 2;
      this._ball._y = window.innerHeight / 2.5;//(this.height_value + this.y_value) * 3.5;
      this._ball.vX = 0;
      this._ball.vY = 0;

    }

    this._ball._x += this._ball.vX;
    this._ball._y += this._ball.vY;
  }

  _draw() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.drawImage(this._background, 0, 0, this._canvas.width, this._canvas.height);
    this._filed.draw(this.x_value, this.y_value, this.width_value, this.height_value);
    this._enemy.draw();
    this._player.draw();
    this._ball.draw();
    this._context.fillStyle = SCORE_COLOR;
    this._context.font = SCORE_FONT;
    this._context.fillText('ENEMY: ' + this._enemy._score, this.width_value / 2.5, 200);
    this._context.fillText('PLAYER: ' + this._player._score, this.width_value / 2.5, this.height_value + 50);
    if (!this._start) {
      this._context.fillStyle = FIELD_COLOR;
      this._context.globalAlpha = 1;
      this._context.fillRect(window.innerWidth / 5.3, window.innerHeight / 8.5, 0.52 * window.innerWidth, 0.62 * window.innerHeight);
      this._context.fillStyle = FONT_COLOR;
      this._context.font = TEXT_FONT;
      this._context.fillText('GAME TENNIS', window.innerWidth / 4.5, window.innerHeight / 4);
      this._context.fillStyle = FONT_COLOR;
      this._context.font = CONTINUE_FONT;
      this._context.fillText('CLICK TO CONTINUE', window.innerWidth / 4.4, window.innerHeight / 1.5);
      this._context.textBaseline = 'top';
      if (this._numberOfGames > 0) {
        this._showWinner();
      }
    }
  }

  _showWinner() {
    let text = '';
    if (!this._playerWin) {
      text = 'YOUR ENEMY IS'
    } else {
      text = 'YOU ARE'
    }
    this._context.fillStyle = SCORE_COLOR;
    this._context.font = WINNER_FONT;
    this._context.fillText(text + ' A WINNER', window.innerWidth / 4.5, window.innerHeight / 4);
    this._context.textBaseline = 'top';
  }

  onLoop() {
    this._update();
    this._draw();
    requestAnimationFrame(this.onLoop.bind(this));
  }


}

const game = new Game();