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
    var PLAYER_SIZE = 20 / 2000;
    var PLAYER_RADIUS = 10 / 700;
    var PLAYER_COLOR = '#183c3d';
    var MAX_DOTS_NUMBER = 40;
    var MAX_ENEMY_NUMBER = 6;
    var SMALL_BALL_SIZE = 8 / 2000;
    var SMALL_BALL_RADIUS = 4 / 700;
    var BACKGROUND_COLOR = '#eeeefe';
    var CONVERGENCE_RADIUS = 5 / 15;
    var ENEMY_SIZE = 22 / 2000;
    var ENEMY_RADIUS = 12 / 700;
    var FIELD_COLOR = '#d7f4de';
    var FONT_COLOR = '#937cdd';
    var PLAYER_ACCELERATION = 0.09;
    var ENEMY_ACCELERATION = 0.01;
    var LOW_ACCELERATION = 0.0045;
    var CANVAS_SCALE = 40;
    var X_REVIEW = 3800;
    var Y_REVIEW = 1840;
    var RESIZE_COEF = 0.505;
    var socket = io();
    var Game = (function () {
        function Game() {
            var _this = this;
            this.start = false;
            this.playerWin = true;
            this.numberOfGames = 0;
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
            this.field = new field_1.Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
            this.player = null;
            this.dots = [];
            socket.emit('new player');
            socket.on('state', function (players) {
                for (var i = 0; i != 2; i++) {
                    players.push(new object_1.GameObject(_this.context, _this.canvas, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION));
                    _this.player = players[i];
                    console.log(1);
                }
            });
            socket.on('state', function (dots) {
                for (var i = 0; MAX_DOTS_NUMBER - _this.dots.length > 0; i++) {
                    dots.push(new dot_1.Dot(_this.context, _this.canvas, _this._getRandomCoordinates(0, 1), _this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, _this._getRandomColor(), SMALL_BALL_RADIUS));
                    _this.dots[i] = dots[i];
                }
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
        Game.prototype._getRandomColor = function () {
            var letters = '0123456789ABCDEF';
            var colorNum = '#';
            for (var i = 0; i < 6; i++) {
                colorNum += letters[Math.floor(Math.random() * 16)];
            }
            return colorNum;
        };
        Game.prototype._drawDot = function () {
            for (var i = 0; i != MAX_DOTS_NUMBER; i++) {
                this.dots[i].draw(this.context);
            }
        };
        Game.prototype._update = function () {
            var _this = this;
            document.addEventListener("mousemove", function (event) {
                _this.playerX = event.offsetX / _this.canvas.clientWidth;
                _this.playerY = event.offsetY / _this.canvas.clientHeight;
            });
            socket.emit('movement', this.player.move(this.playerX, this.playerY));
        };
        Game.prototype._draw = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.field.draw(this.context);
            this.player.draw(this.context);
            this._drawDot();
        };
        Game.prototype.onLoop = function () {
            if (this.player) {
                this._update();
                this._draw();
            }
            requestAnimationFrame(this.onLoop.bind(this));
        };
        Game.prototype._resize = function () {
            var canvas = this.canvas;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                X_REVIEW = width / RESIZE_COEF;
                Y_REVIEW = height / RESIZE_COEF;
                return true;
            }
            return false;
        };
        return Game;
    }());
    var game = new Game;
});
