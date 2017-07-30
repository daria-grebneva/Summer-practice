var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shape = (function () {
        function Shape(context, canvas, _x, _y, _width, _height, color) {
            this.canvas = canvas;
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
            this.color = color;
        }
        Object.defineProperty(Shape.prototype, "_x", {
            get: function () {
                return this.x * this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "_y", {
            get: function () {
                return this.y * this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "_width", {
            get: function () {
                return this.width * this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "_height", {
            get: function () {
                return this.height * this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        return Shape;
    }());
    exports.Shape = Shape;
});
define("rectangle", ["require", "exports", "shape"], function (require, exports, shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(context, canvas, _x, _y, _width, _height, color) {
            return _super.call(this, context, canvas, _x, _y, _width, _height, color) || this;
        }
        Rectangle.prototype.draw = function (context) {
            context.fillStyle = this.color;
            context.fillRect(this._x, this._y, this._width, this._height);
        };
        return Rectangle;
    }(shape_1.Shape));
    exports.Rectangle = Rectangle;
});
define("field", ["require", "exports", "rectangle"], function (require, exports, rectangle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Field = (function (_super) {
        __extends(Field, _super);
        function Field(context, canvas, _x, _y, _width, _height, color) {
            return _super.call(this, context, canvas, _x, _y, _width, _height, color) || this;
        }
        return Field;
    }(rectangle_1.Rectangle));
    exports.Field = Field;
});
define("circle", ["require", "exports", "shape"], function (require, exports, shape_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(context, canvas, _x, _y, _width, _height, color, _radius) {
            var _this = _super.call(this, context, canvas, _x, _y, _width, _height, color) || this;
            _this.radius = _radius;
            return _this;
        }
        Object.defineProperty(Circle.prototype, "_radius", {
            get: function () {
                return this.radius * this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Circle.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
            context.fill();
        };
        return Circle;
    }(shape_2.Shape));
    exports.Circle = Circle;
});
define("object", ["require", "exports", "circle"], function (require, exports, circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(context, canvas, _x, _y, _width, _height, color, _radius, acceleration) {
            var _this = _super.call(this, context, canvas, _x, _y, _width, _height, color, _radius) || this;
            _this.acceleration = acceleration;
            return _this;
        }
        GameObject.prototype.move = function (coordX, coordY) {
            var xDistance = coordX - this.x;
            var yDistance = coordY - this.y;
            var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            if (distance > 0) {
                this.x += xDistance * this.acceleration;
                this.y += yDistance * this.acceleration;
            }
        };
        return GameObject;
    }(circle_1.Circle));
    exports.GameObject = GameObject;
});
define("dot", ["require", "exports", "circle"], function (require, exports, circle_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dot = (function (_super) {
        __extends(Dot, _super);
        function Dot(context, canvas, _x, _y, _width, _height, color, _radius) {
            return _super.call(this, context, canvas, _x, _y, _width, _height, color, _radius) || this;
        }
        return Dot;
    }(circle_2.Circle));
    exports.Dot = Dot;
});
define("game", ["require", "exports", "field", "object", "dot"], function (require, exports, field_1, object_1, dot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PLAYER_SIZE = 50 / 2000;
    var PLAYER_RADIUS = 25 / 700;
    var PLAYER_COLOR = '#183c3d';
    var MAX_DOTS_NUMBER = 5;
    var MAX_ENEMY_NUMBER = 2;
    var SMALL_BALL_SIZE = 20 / 2000;
    var SMALL_BALL_RADIUS = 10 / 700;
    var BACKGROUND_COLOR = '#eeeefe';
    var CONVERGENCE_RADIUS = 5 / 15;
    var ENEMY_SIZE = 55 / 2000;
    var ENEMY_RADIUS = 30 / 700;
    var FIELD_COLOR = '#d7f4de';
    var FONT_COLOR = '#937cdd';
    var PLAYER_ACCELERATION = 0.09;
    var ENEMY_ACCELERATION = 0.01;
    var LOW_ACCELERATION = 0.0045;
    var Game = (function () {
        function Game() {
            var _this = this;
            this.start = false;
            this.playerWin = true;
            this.numberOfGames = 0;
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
            this.field = new field_1.Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
            this.player = new object_1.GameObject(this.context, this.canvas, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
            this.player.x = this.field.width / 2;
            this.player.y = this.field.height / 2;
            this.enemies = [];
            this.dots = [];
            this._addDot();
            this._addEnemy();
            this.canvas.onclick = function (event) {
                _this._startGame();
            };
            this.canvas.addEventListener("mousemove", function (event) {
                _this.playerX = event.offsetX / _this.canvas.clientWidth;
                _this.playerY = event.offsetY / _this.canvas.clientHeight;
            });
            window.addEventListener("resize", function () {
                _this._resize();
            });
            this._resize(this.canvas);
            requestAnimationFrame(this.onLoop.bind(this));
        }
        Game.prototype._getRandomCoordinates = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        Game.prototype._drawDot = function () {
            for (var i = 0; i != MAX_DOTS_NUMBER; i++) {
                this.dots[i].draw(this.context);
            }
        };
        Game.prototype._addDot = function () {
            for (var i = 0; MAX_DOTS_NUMBER - this.dots.length > 0; i++) {
                this.dots.push(new dot_1.Dot(this.context, this.canvas, this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, this._getRandomColor(), SMALL_BALL_RADIUS));
            }
        };
        Game.prototype._addEnemy = function () {
            for (var i = 0; MAX_DOTS_NUMBER - this.enemies.length > 0; i++) {
                this.enemies.push(new object_1.GameObject(this.context, this.canvas, this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), ENEMY_SIZE, ENEMY_SIZE, this._getRandomColor(), ENEMY_RADIUS, ENEMY_ACCELERATION));
            }
        };
        Game.prototype._drawEnemies = function () {
            for (var j = 0; j != MAX_ENEMY_NUMBER; j++) {
                this.enemies[j].draw(this.context);
            }
        };
        Game.prototype._getRandomColor = function () {
            var letters = '0123456789ABCDEF';
            var colorNum = '#';
            for (var i = 0; i < 6; i++) {
                colorNum += letters[Math.floor(Math.random() * 16)];
            }
            return colorNum;
        };
        Game.prototype._getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };
        Game.prototype._resize = function () {
            var canvas = this.canvas;
            var width = canvas.scrollWidth;
            var height = canvas.scrollHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
            return false;
        };
        Game.prototype._enemiesMove = function () {
            if (this.start) {
                for (var j = 0; j != MAX_ENEMY_NUMBER; j++) {
                    var i = this._getRandomInt(0, this.dots.length);
                    if (this._radiusVisibility(this.player, this.enemies[j], CONVERGENCE_RADIUS)) {
                        this.enemies[j].move(this.player.x, this.player.y);
                    }
                    else {
                        for (var j_1 = 0; j_1 != MAX_ENEMY_NUMBER; j_1++) {
                            this.enemies[j_1].move(this._findNearestDotCoordinate(this.enemies[j_1]).x, this._findNearestDotCoordinate(this.enemies[j_1]).y);
                        }
                    }
                }
            }
        };
        Game.prototype._processCollisions = function () {
            //Съедание врагов и игрока
            for (var j = 0; j != MAX_ENEMY_NUMBER; j++) {
                if (this._canEat(this.enemies[j], this.player) == true) {
                    this._endGame();
                }
                else if (this._canEat(this.player, this.enemies[j]) == true) {
                    this.enemies.splice(j, 1);
                    this.numberEatenEnemies++;
                    this._addEnemy();
                }
                else
                    for (var k = 0; k != MAX_ENEMY_NUMBER; k++) {
                        if (this._canEat(this.enemies[k], this.enemies[j]) == true) {
                            this.enemies.splice(j, 1);
                            this._addEnemy();
                        }
                        else if (this._canEat(this.enemies[j], this.enemies[k]) == true) {
                            this.enemies.splice(k, 1);
                            this._addEnemy();
                        }
                    }
            }
            //Съедание точки
            for (var i = 0; i != MAX_DOTS_NUMBER; i++) {
                for (var j = 0; j != MAX_DOTS_NUMBER; j++) {
                    if (this._canEat(this.player, this.dots[i]) == true || this._canEat(this.enemies[j], this.dots[i]) == true) {
                        this.dots.splice(i, 1);
                        this._addDot();
                    }
                }
            }
        };
        Game.prototype._canEat = function (predator, victim) {
            if ((predator.width > victim.width) && (this._checkCollision(predator, victim) == true)) {
                return true;
            }
        };
        Game.prototype._checkCollision = function (predator, victim) {
            if (((predator.x - predator.width / 2 - victim.width / 2) < victim.x
                && victim.x < (predator.x + predator.width / 2 + victim.width / 2))
                && ((predator.y - predator.height - victim.height) < victim.y
                    && victim.y < (predator.y + predator.height + victim.height))) {
                predator.width = predator.width + victim.width * victim.width;
                predator.height = predator.height + victim.height * victim.width;
                predator.radius = predator.radius + victim.radius * victim.width;
                if (predator.acceleration < LOW_ACCELERATION) {
                    predator.acceleration = predator.acceleration - predator.acceleration * victim.width;
                }
                return true;
            }
        };
        Game.prototype._findNearestDotCoordinate = function (enemy) {
            var coordinate_x = 1;
            var coordinate_y = 1;
            var newCoordinate_x = 0;
            var newCoordinate_y = 0;
            var numberNearestDot = 0;
            for (var i = 0; i != MAX_DOTS_NUMBER; i++) {
                newCoordinate_x = Math.abs(enemy.x - this.dots[i].x);
                newCoordinate_y = Math.abs(enemy.y - this.dots[i].y);
                if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
                    coordinate_x = newCoordinate_x;
                    coordinate_y = newCoordinate_y;
                    numberNearestDot = i;
                }
                if (i == MAX_DOTS_NUMBER - 1) {
                    return { x: this.dots[numberNearestDot].x, y: this.dots[numberNearestDot].y };
                }
            }
        };
        Game.prototype._radiusVisibility = function (first_obj, second_obj, radius) {
            return (this._positionRight(first_obj, second_obj, radius) || this._positionLeft(first_obj, second_obj, radius))
                && (this._positionDown(first_obj, second_obj, radius) || this._positionUp(first_obj, second_obj, radius));
        };
        Game.prototype._positionRight = function (first_obj, second_obj, radius) {
            if ((first_obj.x - second_obj.x) <= radius && (first_obj.x + second_obj.width / 2 - second_obj.x) > 0)
                return true;
        };
        Game.prototype._positionLeft = function (first_obj, second_obj, radius) {
            if ((second_obj.x - first_obj.x) <= radius && (second_obj.x + second_obj.width / 2 - first_obj.x) > 0)
                return true;
        };
        Game.prototype._positionUp = function (first_obj, second_obj, radius) {
            if ((second_obj.y - first_obj.y) < radius && (second_obj.y + second_obj.height / 2 - first_obj.y) > 0)
                return true;
        };
        Game.prototype._positionDown = function (first_obj, second_obj, radius) {
            if ((first_obj.y - second_obj.y) < radius && (first_obj.y + second_obj.height / 2 - second_obj.y) > 0)
                return true;
        };
        Game.prototype._startGame = function () {
            if (!this.start) {
                this.start = true;
            }
        };
        Game.prototype._endGame = function () {
            this.start = false;
            this.numberOfGames++;
            this._restart();
        };
        Game.prototype._restart = function () {
            delete this.player;
            this.player = new object_1.GameObject(this.context, this.canvas, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
            this.player.x = this.field.width / 2;
            this.player.y = this.field.height / 2;
            this.enemies = [];
            this.dots = [];
            this._addDot();
            this._addEnemy();
        };
        Game.prototype._drawWallpaper = function () {
            this.context.fillStyle = FIELD_COLOR;
            this.context.globalAlpha = 1;
            this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
            this.context.fillStyle = FONT_COLOR;
            this.context.font = this.canvas.height * 1 / 7 + 'px slabo';
            this.context.fillText('AGARIO', this.canvas.width * 1 / 10, this.canvas.height * 2 / 10);
            this.context.font = this.canvas.height * 1 / 9 + 'px slabo';
            this.context.fillText('Click to continue', this.canvas.width * 1 / 10, this.canvas.height * 3 / 10);
            if (this.numberOfGames > 0) {
                this.context.font = this.canvas.height * 1 / 9 + 'px slabo';
                this.context.fillText('You ate', this.canvas.width * 1 / 10, this.canvas.height * 4 / 10);
            }
        };
        Game.prototype._update = function () {
            this.player.move(this.playerX, this.playerY);
            this._enemiesMove();
            this._processCollisions();
        };
        Game.prototype._draw = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.field.draw(this.context);
            this._drawDot();
            this._drawEnemies();
            this.player.draw(this.context);
            if (!this.start) {
                this._drawWallpaper();
            }
        };
        Game.prototype.onLoop = function () {
            this._update();
            this._draw();
            requestAnimationFrame(this.onLoop.bind(this));
        };
        return Game;
    }());
    var game = new Game();
});
define("prob", ["require", "exports", "rectangle"], function (require, exports, rectangle_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas;
    var context;
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    var rec = new rectangle_2.Rectangle(context, canvas, 0, 0, 1, 1, "red");
    console.log(canvas.width);
    rec.draw(context);
});
