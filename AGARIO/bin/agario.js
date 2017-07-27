const PLAYER_SIZE = 50 / 2000;
const PLAYER_RADIUS = 25 / 700;
const PLAYER_COLOR = '#183c3d';

const MAX_DOTS_NUMBER = 5;
const MAX_ENEMY_NUMBER = 2;

const SMALL_BALL_SIZE = 20 / 2000;
const SMALL_BALL_RADIUS = 10 / 700;

const BACKGROUND_COLOR = '#ffffff';

const CONVERGENCE_RADIUS = 1 / 15;

const ENEMY_SIZE = 55 / 2000;
const ENEMY_RADIUS = 30 / 700;

const FIELD_COLOR = '#d7f4de';
const FONT_COLOR = '#937cdd';

const PLAYER_ACCELERATION = 0.09;
const ENEMY_ACCELERATION = 0.01;
const LOW_ACCELERATION = 0.0045;


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

class Object extends Circle {
  constructor(canvas, color, x, y, width, height, radius, acceleration) {
    super(canvas, color, x, y, width, height, radius);
    this._acceleration = acceleration;
  }

  move(coordX, coordY) {
    let xDistance = coordX - this._x;
    let yDistance = coordY - this._y;
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    if (distance > 0) {
      this._x += xDistance * this._acceleration;
      this._y += yDistance * this._acceleration;
    }
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

    this._player = new Object(this._canvas, PLAYER_COLOR, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_RADIUS, PLAYER_ACCELERATION);
    this._player._x = this._field._width / 2;
    this._player._y = this._field._height / 2;

    this._enemies = [];
    this._dots = [];
    this._addDot();
    this._addEnemy();

    this._canvas.onclick = (event) => {
      this._startGame();
    };
    this._canvas.addEventListener("mousemove", (event) => {
      // this._player.move(event.offsetX / this._canvas.clientWidth, event.offsetY / this._canvas.clientHeight);
      this.playerX = event.offsetX / this._canvas.clientWidth;
      this.playerY = event.offsetY / this._canvas.clientHeight;
    });
    window.addEventListener("resize", () => {
      this._resize();
    });
    this._resize(this._canvas);
    requestAnimationFrame(this.onLoop.bind(this));
  }

  _getRandomCoordinates(min, max) {
    return Math.random() * (max - min) + min;
  }

  _drawDot() {
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      this._dots[i].draw();
    }
  }

  _addDot() {
    for (let i = 0; MAX_DOTS_NUMBER - this._dots.length > 0; i++) {
      this._dots.push(new Dot(this._canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS));
    }
  }

  _addEnemy() {
    for (let i = 0; MAX_DOTS_NUMBER - this._enemies.length > 0; i++) {
      this._enemies.push(new Object(this._canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), ENEMY_SIZE, ENEMY_SIZE, ENEMY_RADIUS, ENEMY_ACCELERATION));
    }
  }

  _drawEnemies() {
    for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
      this._enemies[j].draw();
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

  /*  _moveCamera() {
   this._camera._x = this._player._x - this._camera._width / 2;
   this._camera._y = this._player._y - this._camera._height / 2;
   }*/

  _resize() {
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


  _enemiesMove() {
    if (this._start) {
      for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
        let i = this._getRandomInt(0, this._dots.length);
        if (this._radiusVisibility(this._player, this._enemies[j], CONVERGENCE_RADIUS)) {
          this._enemies[j].move(this._player._x, this._player._y);
        }
        else {
          for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
            this._enemies[j].move(this._findNearestDotCoordinate(this._enemies[j]).x, this._findNearestDotCoordinate(this._enemies[j]).y);
          }
        }
      }
    }
  }

  _processCollisions() {
    //Съедание врагов и игрока
    for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
      if (this._canEat(this._enemies[j], this._player) == true) {
        this._endGame();
      }
      else if (this._canEat(this._player, this._enemies[j]) == true) {
        this._enemies.splice(j, 1);
        this._addEnemy();
      }
      else for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
          if (this._canEat(this._enemies[k], this._enemies[j]) == true) {
            this._enemies.splice(j, 1);
            this._addEnemy();
          } else if (this._canEat(this._enemies[j], this._enemies[k]) == true) {
            this._enemies.splice(k, 1);
            this._addEnemy();
          }
        }
    }

    //Съедание точки
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      for (let j = 0; j != MAX_DOTS_NUMBER; j++) {
        if (this._canEat(this._player, this._dots[i]) == true || this._canEat(this._enemies[j], this._dots[i]) == true) {
          this._dots.splice(i, 1);
          this._addDot();
        }
      }
    }
  }

  _canEat(predator, victim) {
    if ((predator._width > victim._width) && (this._checkCollision(predator, victim) == true)) {
      return true
    }
  }

  _checkCollision(predator, victim) {
    if (((predator._x - predator._width / 2 - victim._width / 2) < victim._x
      && victim._x < (predator._x + predator._width / 2 + victim._width / 2))
      && ((predator._y - predator._height - victim._height) < victim._y
      && victim._y < (predator._y + predator._height + victim._height) )) {
      predator._width = predator._width + victim._width * victim._width;
      predator._height = predator._height + victim._height * victim._width;
      predator._radius = predator._radius + victim._radius * victim._width;
      if (predator._acceleration < LOW_ACCELERATION) {
        predator._acceleration = predator._acceleration - predator._acceleration * victim._width;
        console.log(predator._acceleration);
      }

      return true;
    }
  }

  _findNearestDotCoordinate(enemy) {
    let coordinate_x = 1;
    let coordinate_y = 1;
    let newCoordinate_x = 0;
    let newCoordinate_y = 0;
    let numberNearestDot = 0;
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      newCoordinate_x = Math.abs(enemy._x - this._dots[i]._x);
      newCoordinate_y = Math.abs(enemy._y - this._dots[i]._y);
      if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
        coordinate_x = newCoordinate_x;
        coordinate_y = newCoordinate_y;
        numberNearestDot = i;
      }
      if (i == MAX_DOTS_NUMBER - 1) {
        return {x: this._dots[numberNearestDot]._x, y: this._dots[numberNearestDot]._y}
      }
    }
  }

  _radiusVisibility(first_obj, second_obj, radius) {
    return (this._positionRight(first_obj, second_obj, radius) || this._positionLeft(first_obj, second_obj, radius))
      && (this._positionDown(first_obj, second_obj, radius) || this._positionUp(first_obj, second_obj, radius))
  }

  _positionRight(first_obj, second_obj, radius) {
    if ((first_obj._x - second_obj._x) <= radius && (first_obj._x + second_obj._width / 2 - second_obj._x) > 0)
      return true;

  }

  _positionLeft(first_obj, second_obj, radius) {
    if ((second_obj._x - first_obj._x) <= radius && (second_obj._x + second_obj._width / 2 - first_obj._x) > 0)
      return true;

  }

  _positionUp(first_obj, second_obj, radius) {
    if ((second_obj._y - first_obj._y) < radius && (second_obj._y + second_obj._height / 2 - first_obj._y) > 0)
      return true;

  }

  _positionDown(first_obj, second_obj, radius) {
    if ((first_obj._y - second_obj._y) < radius && (first_obj._y + second_obj._height / 2 - second_obj._y) > 0)
      return true;

  }

  _startGame() {
    if (!this._start) {
      this._start = true;
    }
  }

  _endGame() {
    this._start = false;
    this._numberOfGames++;
    this._restart();
  }

  _restart() {
    delete this._player;
    this._player = new Object(this._canvas, PLAYER_COLOR, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_RADIUS, PLAYER_ACCELERATION);
    this._player._x = this._field._width / 2;
    this._player._y = this._field._height / 2;

    this._enemies = [];
    this._dots = [];
    this._addDot();
    this._addEnemy();
  }

  _drawWallpaper() {
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

  _update() {
    this._player.move(this.playerX, this.playerY);
    this._enemiesMove();
    // this._moveCamera();
    this._processCollisions();
  }

  _draw() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._field.draw(this._canvas.width, this._canvas.height);
    //   this._camera.draw(this._canvas.width, this._canvas.height);
    this._drawDot();
    this._drawEnemies();
    this._player.draw();
    if (!this._start) {
      this._drawWallpaper();
    }
  }

  onLoop() {
    this._update();
    this._draw();
    requestAnimationFrame(this.onLoop.bind(this));
  }
}

const
  game = new Game();
