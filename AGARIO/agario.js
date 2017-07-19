const BALL_SIZE = 50 / 2000;
const BALL_RADIUS = 25 / 700;
const BALL_COLOR = '#183c3d';//'#183c3d'
const PLAYER_SPEED = 100;

const MAX_DOTS_NUMBER = 5;
const MAX_ENEMY_NUMBER = 2;

const SMALL_BALL_SIZE = 20 / 2000;
const SMALL_BALL_RADIUS = 10 / 700;
const SMALL_BALL_COLOR = 'red';

const BACKGROUND_COLOR = '#ffffff';

const CONVERGENCE_RADIUS = 1 / 15;

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
  constructor(canvas, color, x, y, width, height, radius, speed) {
    super(canvas, x, y, width, height, color);
    this._radius = radius;
    this._speed = speed;
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


class Game {
  constructor() {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._start = false;
    this._playerWin = true;
    this._numberOfGames = 0;
    this._field = new Field(this._canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
    this._player = new Circle(this._canvas, BALL_COLOR, 1 / 2, 1 / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS, PLAYER_SPEED);
    this._enemy = [];
    this._dot = [];
    this._addDot();
    this._addEnemy();
    this._canvas.onclick = (event) => {
      this._startGame();
    };
    this._canvas.addEventListener("mousemove", (event) => {
      setTimeout(() => {
        this.playerMove(event, this._player._radius)
      }, this._player._speed);
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

  _drawDot() {
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      this._dot[i].draw();
    }
    this._deleteDot();
  }

  _deleteDot() {
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      for (let j = 0; j != MAX_DOTS_NUMBER; j++) {
        if (this._eatDotCondition(this._player, this._dot[i]) == true || this._eatDotCondition(this._enemy[j], this._dot[i]) == true) {
          if (this._eatDotCondition(this._player, this._dot[i]) == true) {
          }
          this._dot.splice(i, 1);
          this._addDot();
        }
      }
    }
  }

  _addDot() {
    for (let i = 0; MAX_DOTS_NUMBER - this._dot.length > 0; i++) {
      this._dot.push(new Dot(this._canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS));
    }
  }

  _addEnemy() {
    for (let i = 0; MAX_DOTS_NUMBER - this._enemy.length > 0; i++) {
      this._enemy.push(new Circle(this._canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), ENEMY_SIZE, ENEMY_SIZE, ENEMY_RADIUS, ENEMY_SPEED));
    }
  }

  _drawEnemy() {
    for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
      this._enemy[j].draw();
    }
  }

  _eatPlayer() {
    for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
      if (this._enemy[j]._width > this._player._width) {
        if (this._eatDotCondition(this._enemy[j], this._player) == true) {
          return true;
        }
      } else if (this._player._width > this._enemy[j]._width) {
        if ((this._eatDotCondition(this._player, this._enemy[j]) == true) ||
          //TODO ::  Разобраться с логикой съедания противников
          (this._eatEachOtherEnemy(this._enemy[j]) == true))
          this._enemy.splice(j, 1);
        return false;
      }
    }
  }


  //TODO ::  Логика съедания противников
  _eatEachOtherEnemy(lala) {
    for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
      if ((this._eatDotCondition(this._enemy[k], lala) == true) || (this._eatDotCondition(lala, this._enemy[k]) == true)) {
        return true;
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
      eatingPlayer._speed = eatingPlayer._speed * 1.05;
      return true;
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

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
      for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
        let i = this._getRandomInt(0, this._dot.length);
        if ((this._positionRight(this._player, this._enemy[j], CONVERGENCE_RADIUS) || this._positionLeft(this._player, this._enemy[j], CONVERGENCE_RADIUS)) && (this._positionDown(this._player, this._enemy[j], CONVERGENCE_RADIUS) || this._positionUp(this._player, this._enemy[j], CONVERGENCE_RADIUS))) {
          if (this._positionRight(this._player, this._enemy[j], CONVERGENCE_RADIUS)) {
            this._enemy[j]._x += ENEMY_SPEED;
          } else if (this._positionLeft(this._player, this._enemy[j], CONVERGENCE_RADIUS)) {
            this._enemy[j]._x -= ENEMY_SPEED;
          }
          if (this._positionDown(this._player, this._enemy[j], CONVERGENCE_RADIUS)) {
            this._enemy[j]._y += ENEMY_SPEED;
          }
          else if (this._positionUp(this._player, this._enemy[j], CONVERGENCE_RADIUS)) {
            this._enemy[j]._y -= ENEMY_SPEED;
          }
        }
        else {
          this._getNearestDot();
        }
      }
    }

  }

  _getNearestDot() {
    for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
      let coordinate_x = 1;
      let coordinate_y = 1;
      let newCoordinate_x = 0;
      let newCoordinate_y = 0;
      let numberNearestDot = 0;
      for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
        newCoordinate_x = Math.abs(this._enemy[j]._x - this._dot[i]._x);
        newCoordinate_y = Math.abs(this._enemy[j]._y - this._dot[i]._y);
        if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
          coordinate_x = newCoordinate_x;
          coordinate_y = newCoordinate_y;
          numberNearestDot = i;
        }
        if (i == MAX_DOTS_NUMBER - 1) {
          if (this._dot[numberNearestDot]._x > this._enemy[j]._x) {
            this._enemy[j]._x += ENEMY_SPEED;
          } else if (this._dot[numberNearestDot]._x < this._enemy[j]._x) {
            this._enemy[j]._x -= ENEMY_SPEED;
          }
          if (this._dot[numberNearestDot]._y > this._enemy[j]._y) {
            this._enemy[j]._y += ENEMY_SPEED;
          }
          else if (this._dot[numberNearestDot]._y < this._enemy[j]._y) {
            this._enemy[j]._y -= ENEMY_SPEED;
          }
        }
      }
    }
  }

  _positionRight(first_obj, second_obj, radius) {
    if ((first_obj._x - second_obj._x) <= radius && (first_obj._x + second_obj._width / 2 - second_obj._x) > 0) {
      return true;
    }
  }

  _positionLeft(first_obj, second_obj, radius) {
    if ((second_obj._x - first_obj._x) <= radius && (second_obj._x + second_obj._width / 2 - first_obj._x) > 0) {
      return true;
    }
  }

  _positionUp(first_obj, second_obj, radius) {
    if ((second_obj._y - first_obj._y) < radius && (second_obj._y + second_obj._height / 2 - first_obj._y) > 0) {
      return true;
    }
  }

  _positionDown(first_obj, second_obj, radius) {
    if ((first_obj._y - second_obj._y) < radius && (first_obj._y + second_obj._height / 2 - second_obj._y) > 0) {
      return true;
    }
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
    //this._enemy.draw();
    this._drawDot();
    this._drawEnemy();
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
