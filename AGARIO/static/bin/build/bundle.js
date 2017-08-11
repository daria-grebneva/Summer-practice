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
            context.arc(this.x * this.canvas.width, this.y * this.canvas.height, this._radius, 0, Math.PI * 2);
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
                this.x += xDistance * this.acceleration /* / this.canvas.width*/;
                this.y += yDistance * this.acceleration /*/ this.canvas.height*/;
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
    var MAX_ENEMY_NUMBER = 6;
    var SMALL_BALL_SIZE = 8 / 2000;
    var SMALL_BALL_RADIUS = 4 / 700;
    var BACKGROUND_COLOR = '#eeeefe';
    var CONVERGENCE_RADIUS = 5 / 15;
    var ENEMY_SIZE = 22 / 2000;
    var ENEMY_RADIUS = 12 / 700;
    var FIELD_COLOR = '#d7f4de';
    var FONT_COLOR = '#937cdd';
    var PLAYER_ACCELERATION = 0.2;
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
            this.state = {
                players: null,
                id: 0,
                dots: null,
                dots_length: 0,
            };
            this.movement = {
                x: 0,
                y: 0,
                acceleration: 0,
                canvasWidth: 0,
                canvasHeight: 0,
            };
            this.start = false;
            this.playerWin = true;
            this.numberOfGames = 0;
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
            this.field = new field_1.Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
            this.dots = [];
            document.addEventListener("mousemove", function (event) {
                _this.movement.x = (event.offsetX / _this.canvas.clientWidth);
                _this.movement.y = (event.offsetY / _this.canvas.clientHeight);
            });
            socket.emit('new player');
            socket.on("player_created", function () {
                socket.on('state', function (state) {
                    _this.state.players = state.players;
                    _this.state.dots = state.dots;
                    _this.state.dots_length = state.dots.length;
                });
            });
            socket.emit('disconnect');
            window.addEventListener("resize", function () {
                _this._resize();
            });
            this._resize(this.canvas);
            requestAnimationFrame(this.onLoop.bind(this));
        }
        Game.prototype._update = function () {
            socket.emit('movement', this.movement);
            // this.context.setTransform(X_REVIEW / this.canvas.width, 0, 0, Y_REVIEW / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
        };
        Game.prototype._draw = function () {
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.field.draw(this.context);
            this._drawDots();
        };
        Game.prototype._drawPlayer = function () {
            this.player.draw(this.context);
        };
        Game.prototype._drawDots = function () {
            for (var i = 0; i < this.state.dots_length; i++) {
                var dot = this.state.dots[i];
                dot = new dot_1.Dot(this.context, this.canvas, dot.x, dot.y, SMALL_BALL_SIZE, SMALL_BALL_SIZE, dot.color, SMALL_BALL_RADIUS);
                dot.draw(this.context);
            }
        };
        Game.prototype._gameCameraCoordinates = function () {
            var cameraX = Math.round((this.canvas.width / CANVAS_SCALE - this.player._x - this.player._width / 2));
            var cameraY = Math.round((this.canvas.height / CANVAS_SCALE - this.player._y - this.player._height / 2));
            return { x: cameraX, y: cameraY };
        };
        Game.prototype.onLoop = function () {
            this._draw();
            for (var id in this.state.players) {
                this.player = this.state.players[id];
                this.player = new object_1.GameObject(this.context, this.canvas, this.player.x, this.player.y, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
                this.movement.acceleration = this.player.acceleration;
                this.context.setTransform(X_REVIEW / this.canvas.width, 0, 0, Y_REVIEW / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
                this._update();
                this._drawPlayer();
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
                this.movement.canvasWidth = canvas.width;
                this.movement.canvasHeight = canvas.height;
                return true;
            }
            return false;
        };
        return Game;
    }());
    var game = new Game;
});
