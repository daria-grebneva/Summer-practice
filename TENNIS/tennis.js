const PLAYER_COLOR = '#53c9cc';
const ENEMY_COLOR = '#cc5653';

const PLAYER_HEIGHT = 0.05;
const PLAYER_WIDTH = 0.15;

const BALL_SIZE = 50 / 2000;
const BALL_SPEED = 4 / 1000;
const MAX_SPEED = 10 / 1000;
const BALL_RADIUS = 25 / 700;
const BALL_COLOR = '#183c3d';

const END_SCORE = 10;
const BACKGROUND_COLOR = '#ffffff';
const FIELD_COLOR = '#17181a';
const FONT_COLOR = '#53c9cc';
const SCORE_COLOR = '#183c3d';

class Shape {
  constructor(canvas, x, y, width, height, color) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._canvas = canvas;
    this._context = canvas.getContext("2d");
    this._color = color;
  }

  get x() {
    return this._x * this._canvas.width;
  }

  get y() {
    return this._y * this._canvas.height;
  }

  get width() {
    return this._width * this._canvas.width;
  }

  get height() {
    return this._height * this._canvas.height;
  }
}

class Rectangle extends Shape {
  constructor(canvas, x, y, width, height, color) {
    super(canvas, x, y, width, height, color);
  }

  draw() {
    this._context.fillStyle = this._color;
    this._context.fillRect(this.x, this.y, this.width, this.height);
  }
}
class Player extends Rectangle {
  constructor(canvas, x, y, width, height, color) {
    super(canvas, x, y, width, height, color);
    this._score = 0;
  }
}

class Field extends Rectangle {
  constructor(canvas, x, y, width, height, color) {
    super(canvas, x, y, width, height, color);
  }
}


class Circle extends Shape {
  constructor(canvas, color, x, y, width, height, radius) {
    super(canvas, x, y, width, height, color);
    this._radius = radius;
    this.vX = 0;
    this.vY = 0;
  }

  get radius() {
    return this._radius * this._canvas.height;
  }

  draw() {
    this._context.beginPath();
    this._context.fillStyle = this._color;
    this._context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this._context.fill();
  }
}

class Game {
  constructor() {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._background = new Image();
    this._background.src = 'img/background.jpg';
    this._start = false;
    this._playerWin = true;
    this._numberOfGames = 0;
    this._field = new Field(this._canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
    this._enemy = new Player(this._canvas, 1 / 2 - PLAYER_HEIGHT, 0, PLAYER_WIDTH, PLAYER_HEIGHT, ENEMY_COLOR);
    this._player = new Player(this._canvas, 1 / 2 - PLAYER_HEIGHT, 1 - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR);
    this._ball = new Circle(this._canvas, BALL_COLOR, 1 / 2, 1 / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);

    this._canvas.onclick = (event) => {
      this._startGame();
    };
    this._canvas.addEventListener("mousemove", (event) => {
      this.playerMove(event, this._player._width);
    });
    window.addEventListener("resize", () => {
      this.resize();
    });
    this.resize(this._canvas);
    requestAnimationFrame(this.onLoop.bind(this));
  }

  resize() {
    let canvas = this._canvas;
    const width = canvas.scrollWidth;
    const height = canvas.scrollHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  playerMove(event, player_width) {
    if (this._start) {
      let x = event.offsetX / this._canvas.clientWidth;
      // условие проверяет не выходит ли ракетка за пределы поля
      if ((player_width / 2 < x) && x < (1 - player_width / 2)) {
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
    if ((this._ball._x + this._enemy._width < 1)) {
      this._enemy._x = this._ball._x;
    }
  }

  collision(objA, objB) {
    let hasCollisionFromUpY = (objA._y + objA._height + objB._height > objB._y);
    let hasCollisionsFromDownY = (objA._y < objB._y + objB._height);
    let hasCollisionFromLeftX = (objA._x + objA._width > objB._x);
    let hasCollisionsFromRightX = (objA._x < objB._x + objB._width);
    return (hasCollisionFromUpY) && (hasCollisionsFromDownY) && (hasCollisionFromLeftX) && (hasCollisionsFromRightX);
  }

  _update() {
    this._moveEnemy();
    if (this._ball._y - this._ball._height < 0) {
      this._ball.vY = -this._ball.vY;
      this._player._score++;
    }
    if (this._ball._y + this._ball._height > 1) {
      this._ball.vY = -this._ball.vY;
      this._enemy._score++;
    }

    // направляем шарик в противоположную сторону при соприкосновении со СТЕНАМИ игрового поля
    if ((this._ball._x - this._ball._width / 2 < 0) || (this._ball._x + this._ball._width / 2 > 1)) {
      this._ball.vX = -this._ball.vX;
    }

    // Соприкосновение с ракетками
    if ((this.collision(this._enemy, this._ball) && this._ball.vY < 0) || (this.collision(this._player, this._ball) && this._ball.vY > 0)) {
      if (this._ball.vY < MAX_SPEED && -MAX_SPEED < this._ball.vY) {
        if (this._ball.vX < 0) {
          this._ball.vY = this._ball.vY - 1 / 1000;
        } else {
          this._ball.vY = this._ball.vY + 1 / 1000;
        }
        if (this._ball.vX < 0) {
          this._ball.vX = this._ball.vX - 1 / 1000;
        } else {
          this._ball.vX = this._ball.vX + 1 / 1000;
        }
      }
      this._ball.vY = -this._ball.vY;
      if (this._ball.vY === 0) {
        this._ball.vY = -BALL_SPEED / 2;
      }
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
      this._ball._x = this._player._width + this._ball._width;
      this._ball._y = 1 / 2 - this._ball._width / 2;
      this._ball.vX = 0;
      this._ball.vY = 0;
      this._enemy._score = 0;
      this._player._score = 0;
    }

    this._ball._x += this._ball.vX;
    this._ball._y += this._ball.vY;
  }

  _draw() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._field.draw(this._canvas.width, this._canvas.height);
    this._enemy.draw();
    this._player.draw();
    this._ball.draw();
    this._context.fillStyle = SCORE_COLOR;
    this._context.font = this._canvas.height * 1 / 15 + "px lobster";
    this._context.fillText('ENEMY: ' + this._enemy._score, this._canvas.width * 1 / 10, this._canvas.height * 1 / 5);
    this._context.fillText('PLAYER: ' + this._player._score, this._canvas.width * 1 / 10, this._canvas.height * 4 / 5);
    this._screenSaver();
  }

  _screenSaver() {
    if (!this._start) {
      this._context.fillStyle = FIELD_COLOR;
      this._context.globalAlpha = 1;
      this._context.fillRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
      this._context.fillStyle = FONT_COLOR;
      this._context.font = this._canvas.height * 1 / 7 + 'px lobster';
      this._context.fillText('GAME TENNIS', this._canvas.width * 1 / 10, this._canvas.height * 1 / 10);
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
    this._context.font = this._canvas.height * 1 / 10 + 'px lobster';
    this._context.fillText(text + ' A WINNER', this._canvas.width * 1 / 10, this._canvas.height * 2.6 / 10);
    this._context.textBaseline = 'top';
  }

  onLoop() {
    this._update();
    this._draw();
    requestAnimationFrame(this.onLoop.bind(this));
  }

}

const game = new Game();