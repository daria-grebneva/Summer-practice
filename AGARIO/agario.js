const BALL_SIZE = 50 / 2000;
const BALL_SPEED = 4 / 1000;
const MAX_SPEED = 10 / 1000;
const BALL_RADIUS = 25 / 700;
const BALL_COLOR = '#183c3d';//'#183c3d'

const MAX_DOTS_NUMBER = 5;

const SMALL_BALL_SIZE = 20 / 2000;
const SMALL_BALL_RADIUS = 10 / 700;
const SMALL_BALL_COLOR = 'red';

const BACKGROUND_COLOR = 'red';

const CONVERGENCE_RADIUS = 5 / 15;

const ENEMY_SPEED = 4 / 1000;
const ENEMY_SIZE = 65 / 2000;
const ENEMY_RADIUS = 40 / 700;

const FIELD_COLOR = '#d7f4de';
const FONT_COLOR = '#937cdd';

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

class Field extends Rectangle {
  constructor(canvas, x, y, width, height, color) {
    super(canvas, x, y, width, height, color);
  }
}


class Circle extends Shape {
  constructor(canvas, color, x, y, width, height, radius) {
    super(canvas, x, y, width, height, color);
    this._radius = radius;
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

class Dot extends Circle {
  constructor(canvas, color, x, y, width, height, radius) {
    super(canvas, color, x, y, width, height, radius);
  }
}

//TODO :: доделать коллизии со стенами и полом с потолком, бот должен кушать игрока

class Game {
  constructor() {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._start = false;
    this._playerWin = true;
    this._numberOfGames = 0;
    this._field = new Field(this._canvas, 0, 0, 1,1, BACKGROUND_COLOR);
    this._player = new Circle(this._canvas, BALL_COLOR, 1 / 2, 1 / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);
    this._enemy = new Circle(this._canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), ENEMY_SIZE, ENEMY_SIZE, ENEMY_RADIUS);
    this._dotsMaxNumber = MAX_DOTS_NUMBER;
    this._newDot();
    this._canvas.onclick = (event) => {
      this._startGame();
    };
  /*  this._canvas.addEventListener("mousemove", (event) => {
      this.playerMove(event, this._player._radius);
    });*/
    this._canvas.addEventListener("mouseControl", (event) => {
      this.playerMove(event, this._player._radius);
    });
    window.addEventListener("resize", () => {
      this.resize();
    });
    this.resize(this._canvas);
    requestAnimationFrame(this.onLoop.bind(this));
  }

  _getRandomCoordinates(min, max) {
    return Math.random() * (max - min) + min;
  }

  _newDot() {
    this._dot = [];
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      this._dot[i] = new Dot(this._canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS);
    }
  }

  _drawDot() {
    for (let i = 0; i != this._dotsMaxNumber; i++) {
      this._dot[i].draw();
    }
    // this._addDot();
    this._deleteDot();
  }

  _deleteDot() {
    for (let i = 0; i != this._dotsMaxNumber; i++) {
      if (this._eatDotCondition(this._player, this._dot[i]) == true || this._eatDotCondition(this._enemy, this._dot[i]) == true) {
        if (this._eatDotCondition(this._player, this._dot[i]) == true) {
          /* this._field._width = this._field._width * 2;
           this._field._height = this._field._height * 2;
           console.log(this._field._width, this._field._height)*/
        }
        this._dot.splice(i, 1);
        if (this._dotsMaxNumber != 1) {
          this._dotsMaxNumber--;
        }
        this._addDot(i);
        i = 0;
      }
    }
  }

  _eatPlayer() {
    if (this._enemy._width > this._player._width) {
      if (this._eatDotCondition(this._enemy, this._player) == true) {
        return true;
      }
    } else if (this._player._width > this._enemy._width) {
      if (this._eatDotCondition(this._player, this._enemy) == true) {
        delete  this._enemy;
        return false;
      }
    }
  }


  _eatDotCondition(eatingPlayer, food) {
    if (((eatingPlayer._x - eatingPlayer._width / 2 - food._width) < food._x
      && food._x < (eatingPlayer._x + eatingPlayer._width - food._width))
      && ((eatingPlayer._y - eatingPlayer._height - food._height) < food._y
      && food._y < (eatingPlayer._y + eatingPlayer._height + food._height) )) {
      eatingPlayer._width = eatingPlayer._width + BALL_SIZE * BALL_SIZE;
      eatingPlayer._height = eatingPlayer._height + BALL_SIZE * BALL_SIZE;
      eatingPlayer._radius = eatingPlayer._radius + BALL_RADIUS * BALL_SIZE;
      return true;
    }
  }

  _addDot(i) {
    if (this._dotsMaxNumber != MAX_DOTS_NUMBER) {
      i = MAX_DOTS_NUMBER;
      i--;
      this._dot[i] = new Dot(this._canvas, 'blue', this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS);
    }
  }

  _getRandomColor() {
    this._letters = '0123456789ABCDEF';
    this._colorNum = '#';
    for (let i = 0; i < 6; i++) {
      this._colorNum += this._letters[Math.floor(Math.random() * 16)];
    }
    return this._colorNum;
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

  /*  _randomColor() {
   let color = 'rgb(' + Math.random(0, 255) + ',' + Math.random(0, 255) + ',' + Math.random(0, 255) + ')';
   return color;
   }*/

  playerMove(event, player_width) {
    if (this._start) {
      let x = event.offsetX / this._canvas.clientWidth;
      let y = event.offsetY / this._canvas.clientHeight;
      if ((player_width < x) && x < (1 + player_width / 2)) {
        this._player._x = x - player_width / 2;
      }
      if ((player_width * 2 < y) && y < (1 + player_width / 2)) {
        this._player._y = y - player_width;
      }
    }
  }

  enemyMove() {
    if (this._start) {
      let speedEnemy = ENEMY_SPEED;
      if ((this._positionRight() || this._positionLeft()) && (this._positionDown() || this._positionUp())) {
        if (this._positionRight()) {
          this._enemy._x += speedEnemy;
        } else if (this._positionLeft()) {
          this._enemy._x -= speedEnemy;
        }
        if (this._positionDown()) {
          this._enemy._y += speedEnemy;
        }
        else if (this._positionUp()) {
          this._enemy._y -= speedEnemy;
        }
        //TODO :: доделать коллизии со стенами и полом с потолком
        //Стена
      } else if ((this._enemy._x - this._enemy._width / 2 < 0) || (this._enemy._x + this._enemy._width / 2 > 1)) {
        speedEnemy = -speedEnemy;
        //Пол
      } else if (this._enemy._y - this._enemy._height < 0) {
        this._enemy._x -= speedEnemy;
        this._enemy._y += speedEnemy;
        //Потолок
      } else if (this._enemy._y + this._enemy._height > 1) {
        speedEnemy = -speedEnemy;
      } else {
        this._enemy._x -= speedEnemy;
        this._enemy._y -= speedEnemy;
      }

    }
  }

  _positionRight() {
    if ((this._player._x - this._enemy._x) < CONVERGENCE_RADIUS && (this._player._x + this._enemy._width / 2 - this._enemy._x) > 0) {
      return true;
    }
  }

  _positionLeft() {
    if ((this._enemy._x - this._player._x) < CONVERGENCE_RADIUS && (this._enemy._x + this._enemy._width / 2 - this._player._x) > 0) {
      return true;
    }
  }

  _positionUp() {
    if ((this._enemy._y - this._player._y) < CONVERGENCE_RADIUS && (this._enemy._y + this._enemy._height / 2 - this._player._y) > 0) {
      return true;
    }
  }

  _positionDown() {
    if ((this._player._y - this._enemy._y) < CONVERGENCE_RADIUS && (this._player._y + this._enemy._height / 2 - this._enemy._y) > 0) {
      return true;
    }
  }


  _updateEnemyCoordinates() {

  }

  _startGame() {
    if (!this._start) {
      this._start = true;
    }
  }

  _endGame() {
    if (this._eatPlayer() == true) {
      this._start = false;
      this._numberOfGames++;
    }
  }

  _gameWallpaper() {
    if (!this._start) {
      this._context.fillStyle = FIELD_COLOR;
      this._context.globalAlpha = 1;
      this._context.fillRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
      this._context.fillStyle = FONT_COLOR;
      this._context.font = this._canvas.height * 1 / 7 + 'px slabo';
      this._context.fillText('AGARIO', this._canvas.width * 1 / 10, this._canvas.height * 2 / 10);
      this._context.font = this._canvas.height * 1 / 9 + 'px slabo';
      this._context.fillText('Click to continue', this._canvas.width * 1 / 10, this._canvas.height * 3 / 10);
      if (this._numberOfGames > 0) {
        this._context.font = this._canvas.height * 1 / 9 + 'px slabo';
        this._context.fillText('You ate', this._canvas.width * 1 / 10, this._canvas.height * 4 / 10);
      }
    }
  }

  _update() {
    this.enemyMove();
    this._endGame();
  }

  _draw() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._field.draw(this._canvas.width, this._canvas.height);
    this._player.draw();
    this._enemy.draw();
    this._drawDot();
    this._gameWallpaper();
  }


  onLoop() {
    this._update();
    this._draw();
    requestAnimationFrame(this.onLoop.bind(this));
  }

}

const
  game = new Game();
