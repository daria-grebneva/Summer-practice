const BALL_SIZE = 50 / 2000;
const BALL_SPEED = 4 / 1000;
const MAX_SPEED = 10 / 1000;
const BALL_RADIUS = 25 / 700;
const BALL_COLOR = '#183c3d';//'#183c3d'

const MAX_DOTS_NUMBER = 5;

const SMALL_BALL_SIZE = 10 / 2000;
const SMALL_BALL_RADIUS = 5 / 700;
const SMALL_BALL_COLOR = 'red';

const BACKGROUND_COLOR = 'white';

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
  constructor(canvas, color, x, y, width, height, radius, counter) {
    super(canvas, color, x, y, width, height, radius);
    this._counter = counter;
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
    this._ball = new Circle(this._canvas, BALL_COLOR, 1 / 2, 1 / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);
    this._dot = [];
    /* for (this._i = 0; this._i != MAX_DOTS_NUMBER; this._i++) {
     this._dot[this._i] = new Dot(this._canvas, SMALL_BALL_COLOR, this.getRandomizer(0, 1), this.getRandomizer(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS, this._counter);
     }*/
    this._newDot();
    //this._ball = new Circle(this._canvas, BALL_COLOR, 1 / 2, 1 / 2, BALL_SIZE, BALL_SIZE, BALL_RADIUS);
    this._canvas.onclick = (event) => {
      this._startGame();
    };
    this._canvas.addEventListener("mousemove", (event) => {
      this.playerMove(event, this._ball._radius);
    });
    window.addEventListener("resize", () => {
      this.resize();
    });
    this.resize(this._canvas);
    requestAnimationFrame(this.onLoop.bind(this));
  }

  getRandomizer(min, max) {
    return Math.random() * (max - min) + min;
  }

  _newDot() {
    this._dot = [];
    for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
      this._dot[i] = new Dot(this._canvas, this._getRandomColor(), this.getRandomizer(0, 1), this.getRandomizer(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS, this._counter);
    }
  }

  _drawDot() {
    for (this._i = 0; this._i != MAX_DOTS_NUMBER; this._i++) {
      this._dot[this._i].draw();

    }
    this.deleteBall();
  }

  _getRandomColor() {
    this._letters = '0123456789ABCDEF';
    this._colorNum = '#';
    for (let i = 0; i < 6; i++) {
      this._colorNum += this._letters[Math.floor(Math.random() * 16)];
    }
    return this._colorNum;
  }

  deleteBall() {
    for (this._i = 0; this._i != MAX_DOTS_NUMBER; this._i++) {
      if (((this._ball._x - this._ball._width / 2 - this._dot[this._i]._width) < this._dot[this._i]._x
        && this._dot[this._i]._x < (this._ball._x + this._ball._width - this._dot[this._i]._width))
        && ((this._ball._y - this._ball._height - this._dot[this._i]._height) < this._dot[this._i]._y
        && this._dot[this._i]._y < (this._ball._y + this._ball._height + this._dot[this._i]._height) )) {
        delete this._dot[this._i];

        console.log(this._i);
      }
    }
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

  _randomColor() {
    let color = 'rgb(' + Math.random(0, 255) + ',' + Math.random(0, 255) + ',' + Math.random(0, 255) + ')';
    //  console.log(color);
    return color;
  }

  playerMove(event, player_width) {
    if (this._start) {
      let x = event.offsetX / this._canvas.clientWidth;
      let y = event.offsetY / this._canvas.clientHeight;
      if ((player_width < x) && x < (1 + player_width / 2)) {
        this._ball._x = x - player_width / 2;
      }
      if ((player_width * 2 < y) && y < (1 + player_width / 2)) {
        this._ball._y = y - player_width;
      }
    }
  }

  _startGame() {
    if (!this._start) {
      this._start = true;
    }
  }

  _update() {
    //  this.deleteBall();
  }

  _draw() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._field.draw(this._canvas.width, this._canvas.height);
    this._ball.draw();
    this._drawDot();
    let color = '\'rgb(' + Math.random(0, 255) + ',' + Math.random(0, 255) + ',' + Math.random(0, 255) + ')\'';
    console.log(color);
    // this._randomColor();
    /* this._arr[1].draw();
     this._arr[2].draw();
     this._arr[3].draw();*/
  }


  onLoop() {
    this._update();
    this._draw();
    requestAnimationFrame(this.onLoop.bind(this));
  }

}

const
  game = new Game();
