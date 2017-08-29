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
define("Shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shape = (function () {
        function Shape(context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color) {
            this.canvas = canvas;
            this.x = scaledX;
            this.y = scaledY;
            this.width = scaledWidth;
            this.height = scaledHeight;
            this.color = color;
        }
        Object.defineProperty(Shape.prototype, "scaledX", {
            get: function () {
                return this.x * this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "scaledY", {
            get: function () {
                return this.y * this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "scaledWidth", {
            get: function () {
                return this.width * this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "scaledHeight", {
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
define("Rectangle", ["require", "exports", "Shape"], function (require, exports, Shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color) {
            return _super.call(this, context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color) || this;
        }
        Rectangle.prototype.draw = function (context) {
            context.fillStyle = this.color;
            context.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
        };
        return Rectangle;
    }(Shape_1.Shape));
    exports.Rectangle = Rectangle;
});
define("Field", ["require", "exports", "Rectangle"], function (require, exports, Rectangle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Field = (function (_super) {
        __extends(Field, _super);
        function Field(context, canvas, _x, _y, _width, _height, color) {
            return _super.call(this, context, canvas, _x, _y, _width, _height, color) || this;
        }
        return Field;
    }(Rectangle_1.Rectangle));
    exports.Field = Field;
});
define("Circle", ["require", "exports", "Shape"], function (require, exports, Shape_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(context, canvas, _x, _y, _width, _height, color, scaledRadius) {
            var _this = _super.call(this, context, canvas, _x, _y, _width, _height, color) || this;
            _this.radius = scaledRadius;
            return _this;
        }
        Object.defineProperty(Circle.prototype, "scaledRadius", {
            get: function () {
                return this.radius * this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Circle.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x * this.canvas.width, this.y * this.canvas.height, this.radius * this.canvas.width, 0, Math.PI * 2);
            context.fill();
        };
        return Circle;
    }(Shape_2.Shape));
    exports.Circle = Circle;
});
define("Player", ["require", "exports", "Circle"], function (require, exports, Circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(context, canvas, _x, _y, _width, _height, color, _radius, acceleration) {
            var _this = _super.call(this, context, canvas, _x, _y, _width, _height, color, _radius) || this;
            _this.acceleration = acceleration;
            return _this;
        }
        return Player;
    }(Circle_1.Circle));
    exports.Player = Player;
});
define("Food", ["require", "exports", "Circle"], function (require, exports, Circle_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Food = (function (_super) {
        __extends(Food, _super);
        function Food(context, canvas, _x, _y, _width, _height, color, _radius) {
            return _super.call(this, context, canvas, _x, _y, _width, _height, color, _radius) || this;
        }
        return Food;
    }(Circle_2.Circle));
    exports.Food = Food;
});
define("Config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PLAYER_SIZE = 10 / 2000;
    exports.PLAYER_SIZE = PLAYER_SIZE;
    var PLAYER_RADIUS = 5 / 700;
    exports.PLAYER_RADIUS = PLAYER_RADIUS;
    var PLAYER_COLOR = '#183c3d';
    exports.PLAYER_COLOR = PLAYER_COLOR;
    var BACKGROUND_COLOR = '#eeeefe';
    exports.BACKGROUND_COLOR = BACKGROUND_COLOR;
    var PLAYER_ACCELERATION = 0.09;
    exports.PLAYER_ACCELERATION = PLAYER_ACCELERATION;
    var FIELD_COLOR = 'rgba(238, 238, 254, 0.8)';
    exports.FIELD_COLOR = FIELD_COLOR;
    var FONT_COLOR = '#937cdd';
    exports.FONT_COLOR = FONT_COLOR;
    var CANVAS_SCALE = 55;
    exports.CANVAS_SCALE = CANVAS_SCALE;
    var RESIZE_COEF = 0.505;
    exports.RESIZE_COEF = RESIZE_COEF;
});
define("Painter", ["require", "exports", "Player", "Food", "Config"], function (require, exports, Player_1, Food_1, Config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Painter = (function () {
        function Painter() {
            this.state = {
                players: null,
                food: null,
                food_length: 0,
                food_width: 0,
                food_radius: 0,
                enemies: null,
                enemies_length: 0,
                enemies_width: 0,
                enemies_radius: 0,
            };
            this.movement = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                radius: 0,
            };
        }
        Painter.prototype.paint = function (context, canvas, statePlayers, movement, player, field, start, food_length, enemies_length, food, enemies) {
            this.context = context;
            this.canvas = canvas;
            this.state.players = statePlayers;
            this.state.food_length = food_length;
            this.state.enemies_length = enemies_length;
            this.state.food = food;
            this.state.enemies = enemies;
            this.movement = movement;
            this.player = player;
            this.field = field;
            this.start = start;
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var xReview = this.canvas.width / Config_1.RESIZE_COEF;
            var yReview = this.canvas.height / Config_1.RESIZE_COEF;
            this.context.setTransform(xReview / this.canvas.width, 0, 0, yReview / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
            this.field.draw(this.context);
            if (this.start) {
                this._drawFood();
                this._drawPlayers();
                this._drawEnemies();
            }
            else {
                this._drawWallpaper();
            }
        };
        Painter.prototype._drawWallpaper = function () {
            this.context.fillStyle = Config_1.FIELD_COLOR;
            this.context.globalAlpha = 1;
            this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
            this.context.fillStyle = Config_1.FONT_COLOR;
            this.context.font = this.canvas.height * 1 / 7 + 'px lobster';
            this.context.fillText('AGARIO', this.canvas.width * 3 / 10, this.canvas.height * 4 / 10);
            this.context.font = this.canvas.height * 1 / 9 + 'px lobster';
            this.context.fillText('Click to start', this.canvas.width * 3 / 10, this.canvas.height * 5 / 10);
        };
        Painter.prototype._drawPlayers = function () {
            for (var id in this.state.players) {
                this.other_players = this.state.players[id];
                this.movement.width = this.other_players.width;
                this.movement.height = this.other_players.height;
                this.movement.radius = this.other_players.radius;
                this.context.beginPath();
                this.context.fillStyle = this.other_players.color;
                this.context.arc(this.other_players.x * this.canvas.width, this.other_players.y * this.canvas.height, this.movement.radius * this.canvas.width, 0, Math.PI * 2);
                this.context.fill();
                this.context.fillStyle = 'black';
                this.context.font = this.other_players.width * this.canvas.width / 1.5 + 'px lobster';
                var width = Math.round(this.other_players.width * 10000) / 100;
                this.context.fillText(String(width), (this.other_players.x - this.other_players.width / 2) * this.canvas.width, (this.other_players.y + this.other_players.height / 2) * this.canvas.height);
            }
        };
        Painter.prototype._drawFood = function () {
            for (var i = 0; i < this.state.food_length; i++) {
                var food = this.state.food[i];
                food = new Food_1.Food(this.context, this.canvas, food.x, food.y, food.width, food.height, food.color, food.radius);
                food.draw(this.context);
            }
        };
        Painter.prototype._drawEnemies = function () {
            for (var i = 0; i < this.state.enemies_length; i++) {
                var enemy = this.state.enemies[i];
                enemy = new Player_1.Player(this.context, this.canvas, enemy.x, enemy.y, enemy.width, enemy.height, enemy.color, enemy.radius, enemy.acceleration);
                this.context.beginPath();
                this.context.fillStyle = enemy.color;
                this.context.arc(enemy.x * this.canvas.width, enemy.y * this.canvas.height, enemy.radius * this.canvas.width, 0, Math.PI * 2);
                this.context.fill();
                this.context.fillStyle = 'black';
                this.context.font = enemy.width * this.canvas.width / 1.5 + 'px lobster';
                var width = Math.round(enemy.width * 10000) / 100;
                this.context.fillText(String(width), (enemy.x - enemy.width / 2) * this.canvas.width, (enemy.y + enemy.height / 2) * this.canvas.height);
            }
        };
        Painter.prototype._gameCameraCoordinates = function () {
            var cameraX = Math.round((this.canvas.width / Config_1.CANVAS_SCALE - this.movement.x * this.canvas.width - this.player.width / 2));
            var cameraY = Math.round((this.canvas.height / Config_1.CANVAS_SCALE - this.movement.y * this.canvas.height - this.player.height / 2));
            return { x: cameraX, y: cameraY };
        };
        return Painter;
    }());
    exports.Painter = Painter;
});
define("game", ["require", "exports", "Field", "Player", "Painter", "Config"], function (require, exports, Field_1, Player_2, Painter_1, Config_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //let io = require('socket.io');
    var socket = io();
    var Game = (function () {
        function Game() {
            var _this = this;
            this.state = {
                players: null,
                food: null,
                food_length: 0,
                food_width: 0,
                food_radius: 0,
                enemies: null,
                enemies_length: 0,
                enemies_width: 0,
                enemies_radius: 0,
            };
            this.movement = {
                x: 0,
                y: 0
            };
            this.start = false;
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext("2d");
            this.field = new Field_1.Field(this.context, this.canvas, 0, 0, 1, 1, Config_2.BACKGROUND_COLOR);
            this.player = new Player_2.Player(this.context, this.canvas, this.canvas.width / 2, this.canvas.height / 2, Config_2.PLAYER_SIZE, Config_2.PLAYER_SIZE, Config_2.PLAYER_COLOR, Config_2.PLAYER_RADIUS, Config_2.PLAYER_ACCELERATION);
            this.draw = new Painter_1.Painter();
            socket.emit('new player');
            this.canvas.onclick = function (event) {
                _this.start = true;
            };
            socket.on("player_created", function () {
                socket.on('state', function (state) {
                    _this.state.players = state.players;
                    _this.state.food = state.food;
                    _this.state.food_length = state.food.length;
                    for (var i = 0; i < _this.state.food_length; i++) {
                        _this.state.food_width = state.food[i].width;
                        _this.state.food_radius = state.food[i].radius;
                    }
                    _this.state.enemies = state.enemies;
                    _this.state.enemies_length = state.enemies.length;
                    for (var i = 0; i < _this.state.enemies_length; i++) {
                        _this.state.enemies_width = state.enemies[i].width;
                        _this.state.enemies_radius = state.enemies[i].radius;
                    }
                });
            });
            socket.emit('disconnect');
            window.addEventListener("resize", function () {
                _this._resize();
            });
            this._resize();
            requestAnimationFrame(this.onLoop.bind(this));
        }
        Game.prototype._update = function () {
            socket.emit('movement', this.movement);
            this._mouseCoordinates();
        };
        Game.prototype._mouseCoordinates = function () {
            var _this = this;
            addEventListener("mousemove", function (event) {
                _this.movement.x = (event.offsetX / _this.canvas.clientWidth);
                _this.movement.y = (event.offsetY / _this.canvas.clientHeight);
            });
        };
        Game.prototype.onLoop = function () {
            this._update();
            this.draw.paint(this.context, this.canvas, this.state.players, this.movement, this.player, this.field, this.start, this.state.food_length, this.state.enemies_length, this.state.food, this.state.enemies);
            requestAnimationFrame(this.onLoop.bind(this));
        };
        Game.prototype._resize = function () {
            var canvas = this.canvas;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
            return false;
        };
        return Game;
    }());
    var game = new Game;
});
