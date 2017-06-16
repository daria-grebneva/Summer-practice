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
const FIELD_COLOR = '#ffffff';
const FONT_COLOR = '#53c9cc';
const SCORE_COLOR = '#183c3d';

const TEXT_FONT = 'bold 70px lobster';
const SCORE_FONT = '50px lobster';
const WINNER_FONT = 'bold 50px lobster';

class Rectangle {
  constructor(context, x, y, width, height, color) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._context = context;
    this._color = color;
  }

/*  draw() {
    this._context.fillStyle = this._color;
    this._context.fillRect(this._x, this._y, this._width, this._height);
  }*/

  /*
   position() {
   return {x: this._x, y: this._y};
   }

   setPosition(x, y) {
   this._x = x;
   this._y = y;
   }*/
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
  draw(width, height) {
    this._context.fillStyle = this._color;
    this._context.fillRect(this._x, this._y, width, height);
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
    this._background.src = 'img/background.jpg';
    this._start = false;
    this._playerWin = true;
    this._numberOfGames = 0;
    this._filed = new Field(this._context, 0, 0, 0.9 * window.innerWidth, 0.9 * window.innerHeight, BACKGROUND_COLOR);
    this._enemy = new Player(this._context, this._filed._width / 2 - PLAYER_HEIGHT, 0, PLAYER_WIDTH, PLAYER_HEIGHT, ENEMY_COLOR);
    this._player = new Player(this._context, this._filed._width / 2 - PLAYER_HEIGHT, this._filed._height - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR);
    this._ball = new Circle(this._context, BALL_COLOR, this._filed._width / 2, this._filed._height / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);
    this._canvas.addEventListener("mousemove", (event) => {
      this.playerMove(event, this._player._width, this._canvas.width);
    });
    this._canvas.onclick = (event) => {
      this._startGame();
    };
    requestAnimationFrame(this.onLoop.bind(this));
  }

  playerMove(event, player_width, filed_width) {
    if (this._start) {
      let x = event.pageX;
      // условие проверяет не выходит ли ракетка за пределы поля
      if ((player_width / 2 < x) && x < (filed_width - player_width / 2)) {
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
    if ((x > 0) && (x < (this._canvas.width - this._enemy._width ))) {
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
    //  const playerPosition = this._player.position();
    // this._player.setPosition(playerPosition.x + 3, playerPosition.y + 2);
    this._canvas.width = 0.9 * window.innerWidth;
    this._canvas.height = 0.9 * window.innerHeight;
    this._moveEnemy();
    if (this._ball._y - this._ball._height / 2 < 0) {
      this._ball.vY = -this._ball.vY;
      this._player._score++;
    }
    if (this._ball._y + this._ball._height / 2 > this._canvas.height) {
      this._ball.vY = -this._ball.vY;
      this._enemy._score++;
    }

    // направляем шарик в противоположную сторону при соприкосновении со СТЕНАМИ игрового поля
    if ((this._ball._x - this._ball._width / 2 < 0) || (this._ball._x + this._ball._width / 2 > this._canvas.width)) {//+ g_ball.width
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
      this._ball._x = this._player._width + this._ball._width;
      this._ball._y = this._canvas.height / 2 - this._ball._width / 2;
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
    //this._context.drawImage(this._background, 0, 0, this._canvas.width, this._canvas.height);
    this._filed.draw(this._canvas.width, this._canvas.height);
    this._enemy.draw();
    this._player.draw();
    this._ball.draw();
    this._context.fillStyle = SCORE_COLOR;
    this._context.font = SCORE_FONT;
    this._context.fillText('ENEMY: ' + this._enemy._score, 100, 100);
    this._context.fillText('PLAYER: ' + this._player._score, 100, this._canvas.height - 150);
    if (!this._start) {
      this._context.fillStyle = FIELD_COLOR;
      this._context.globalAlpha = 1;
      this._context.fillRect(0, 0, this._canvas.width, this._canvas.width);
      this._context.fillStyle = FONT_COLOR;
      this._context.font = TEXT_FONT;
      this._context.fillText('GAME TENNIS', 40, 80);
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
    this._context.fillText(text + ' A WINNER', 40, 240);
    this._context.textBaseline = 'top';
  }

  onLoop() {
    this._update();
    this._draw();
    requestAnimationFrame(this.onLoop.bind(this));
  }


}

const game = new Game();