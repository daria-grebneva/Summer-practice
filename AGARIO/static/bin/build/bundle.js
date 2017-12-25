define("Shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Shape {
        constructor(context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color) {
            this.canvas = canvas;
            this.x = scaledX;
            this.y = scaledY;
            this.width = scaledWidth;
            this.height = scaledHeight;
            this.color = color;
        }
        get scaledX() {
            return this.x * this.canvas.width;
        }
        get scaledY() {
            return this.y * this.canvas.height;
        }
        get scaledWidth() {
            return this.width * this.canvas.width;
        }
        get scaledHeight() {
            return this.height * this.canvas.height;
        }
    }
    exports.Shape = Shape;
});
define("Rectangle", ["require", "exports", "Shape"], function (require, exports, Shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rectangle extends Shape_1.Shape {
        constructor(context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color) {
            super(context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color);
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
        }
    }
    exports.Rectangle = Rectangle;
});
define("Field", ["require", "exports", "Rectangle"], function (require, exports, Rectangle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Field extends Rectangle_1.Rectangle {
        constructor(context, canvas, _x, _y, _width, _height, color) {
            super(context, canvas, _x, _y, _width, _height, color);
        }
    }
    exports.Field = Field;
});
define("Circle", ["require", "exports", "Shape"], function (require, exports, Shape_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Circle extends Shape_2.Shape {
        constructor(context, canvas, _x, _y, _width, _height, color, scaledRadius) {
            super(context, canvas, _x, _y, _width, _height, color);
            this.radius = scaledRadius;
        }
        get scaledRadius() {
            return this.radius * this.canvas.height;
        }
        draw(context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x * this.canvas.width, this.y * this.canvas.height, this.radius * this.canvas.width, 0, Math.PI * 2);
            context.fill();
        }
    }
    exports.Circle = Circle;
});
define("Player", ["require", "exports", "Circle"], function (require, exports, Circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player extends Circle_1.Circle {
        constructor(context, canvas, _x, _y, _width, _height, color, _radius, acceleration) {
            super(context, canvas, _x, _y, _width, _height, color, _radius);
            this.acceleration = acceleration;
        }
    }
    exports.Player = Player;
});
define("Food", ["require", "exports", "Circle"], function (require, exports, Circle_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Food extends Circle_2.Circle {
        constructor(context, canvas, _x, _y, _width, _height, color, _radius) {
            super(context, canvas, _x, _y, _width, _height, color, _radius);
        }
    }
    exports.Food = Food;
});
define("Config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PLAYER_SIZE = 10 / 2000;
    exports.PLAYER_SIZE = PLAYER_SIZE;
    const PLAYER_RADIUS = 5 / 700;
    exports.PLAYER_RADIUS = PLAYER_RADIUS;
    const PLAYER_COLOR = '#183c3d';
    exports.PLAYER_COLOR = PLAYER_COLOR;
    const BACKGROUND_COLOR = '#eeeefe';
    exports.BACKGROUND_COLOR = BACKGROUND_COLOR;
    const PLAYER_ACCELERATION = 0.09;
    exports.PLAYER_ACCELERATION = PLAYER_ACCELERATION;
    const FIELD_COLOR = 'rgba(238, 238, 254, 0.8)';
    exports.FIELD_COLOR = FIELD_COLOR;
    const FONT_COLOR = '#937cdd';
    exports.FONT_COLOR = FONT_COLOR;
    const CANVAS_SCALE = 55; //4;
    exports.CANVAS_SCALE = CANVAS_SCALE;
    const RESIZE_COEF = 0.505; //0.605;
    exports.RESIZE_COEF = RESIZE_COEF;
    const KEY_RADIUS = "r";
    exports.KEY_RADIUS = KEY_RADIUS;
    const KEY_COLOR = "l";
    exports.KEY_COLOR = KEY_COLOR;
    const KEY_FOOD = "f";
    exports.KEY_FOOD = KEY_FOOD;
    const KEY_PLAYERS = "p";
    exports.KEY_PLAYERS = KEY_PLAYERS;
    const KEY_ENEMIES = "e";
    exports.KEY_ENEMIES = KEY_ENEMIES;
    const KEY_MOVEMENT = "m";
    exports.KEY_MOVEMENT = KEY_MOVEMENT;
    const KEY_NEW_PLAYER = "n";
    exports.KEY_NEW_PLAYER = KEY_NEW_PLAYER;
    const KEY_UPDATE_DATA = "u";
    exports.KEY_UPDATE_DATA = KEY_UPDATE_DATA;
    const KEY_PLAYER_CREATED = "c";
    exports.KEY_PLAYER_CREATED = KEY_PLAYER_CREATED;
});
define("Painter", ["require", "exports", "Player", "Food", "Config"], function (require, exports, Player_1, Food_1, Config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Painter {
        constructor() {
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
        paint(context, canvas, statePlayers, movement, player, field, start, food_length, enemies_length, food, enemies) {
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
            let xReview = this.canvas.width / Config_1.RESIZE_COEF;
            let yReview = this.canvas.height / Config_1.RESIZE_COEF;
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
        }
        _drawWallpaper() {
            this.context.fillStyle = Config_1.FIELD_COLOR;
            this.context.globalAlpha = 1;
            this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
            this.context.fillStyle = Config_1.FONT_COLOR;
            this.context.font = this.canvas.height * 1 / 7 + 'px lobster';
            this.context.fillText('AGARIO', this.canvas.width * 3 / 10, this.canvas.height * 4 / 10);
            this.context.font = this.canvas.height * 1 / 9 + 'px lobster';
            this.context.fillText('Click to start', this.canvas.width * 3 / 10, this.canvas.height * 5 / 10);
        }
        _drawPlayers() {
            for (let id in this.state.players) {
                this.other_players = this.state.players[id];
                this.movement.width = this.other_players[Config_1.KEY_RADIUS];
                this.movement.height = this.other_players[Config_1.KEY_RADIUS];
                this.movement.radius = this.other_players[Config_1.KEY_RADIUS];
                this.context.beginPath();
                this.context.fillStyle = this.other_players[Config_1.KEY_COLOR];
                this.context.arc(this.other_players['x'] * this.canvas.width, this.other_players['y'] * this.canvas.height, this.movement.radius * this.canvas.width, 0, Math.PI * 2);
                this.context.fill();
                this.context.fillStyle = 'black';
                this.context.font = this.other_players[Config_1.KEY_RADIUS] * this.canvas.width / 1.5 + 'px lobster';
                let width = Math.round(this.other_players[Config_1.KEY_RADIUS] * 10000) / 100;
                this.context.fillText(String(width), (this.other_players['x'] - this.other_players[Config_1.KEY_RADIUS] / 2) * this.canvas.width, (this.other_players['y'] + this.other_players[Config_1.KEY_RADIUS] / 2) * this.canvas.height);
            }
        }
        _drawFood() {
            for (let i = 0; i < this.state.food_length; i++) {
                let food = this.state.food[i];
                food = new Food_1.Food(this.context, this.canvas, food['x'], food['y'], food[Config_1.KEY_RADIUS], food[Config_1.KEY_RADIUS], food[Config_1.KEY_COLOR], food[Config_1.KEY_RADIUS]);
                food.draw(this.context);
            }
        }
        _drawEnemies() {
            for (let i = 0; i < this.state.enemies_length; i++) {
                let enemy = this.state.enemies[i];
                enemy = new Player_1.Player(this.context, this.canvas, enemy['x'], enemy['y'], enemy[Config_1.KEY_RADIUS], enemy[Config_1.KEY_RADIUS], enemy[Config_1.KEY_COLOR], enemy.radius, enemy.acceleration);
                this.context.beginPath();
                this.context.fillStyle = enemy.color;
                this.context.arc(enemy['x'] * this.canvas.width, enemy['y'] * this.canvas.height, enemy.radius * this.canvas.width, 0, Math.PI * 2);
                this.context.fill();
                this.context.fillStyle = 'black';
                this.context.font = enemy[Config_1.KEY_RADIUS] * this.canvas.width / 1.5 + 'px lobster';
                let width = Math.round(enemy[Config_1.KEY_RADIUS] * 10000) / 100;
                this.context.fillText(String(width), (enemy['x'] - enemy[Config_1.KEY_RADIUS] / 2) * this.canvas.width, (enemy['y'] + enemy[Config_1.KEY_RADIUS] / 2) * this.canvas.height);
            }
        }
        _gameCameraCoordinates() {
            let cameraX = Math.round((this.canvas.width / Config_1.CANVAS_SCALE - this.movement.x * this.canvas.width - this.player.width / 2));
            let cameraY = Math.round((this.canvas.height / Config_1.CANVAS_SCALE - this.movement.y * this.canvas.height - this.player.height / 2));
            return { x: cameraX, y: cameraY };
        }
    }
    exports.Painter = Painter;
});
define("game", ["require", "exports", "Field", "Player", "Painter", "Config"], function (require, exports, Field_1, Player_2, Painter_1, Config_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*declare const require: any;
    const io = require('socket.io-client');*/
    let socket = io();
    class Game {
        constructor() {
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
            socket.emit(Config_2.KEY_NEW_PLAYER);
            this.canvas.onclick = (event) => {
                this.start = true;
            };
            socket.on(Config_2.KEY_PLAYER_CREATED, () => {
                socket.on(Config_2.KEY_UPDATE_DATA, (state) => {
                    let newState = JSON.parse(state);
                    this.state.players = newState[Config_2.KEY_PLAYERS];
                    this.state.food = newState[Config_2.KEY_FOOD];
                    this.state.food_length = 0;
                    for (let property in this.state.food) {
                        if (Object.prototype.hasOwnProperty.call(this.state.food, property)) {
                            this.state.food_width = newState[Config_2.KEY_FOOD][Config_2.KEY_RADIUS];
                            this.state.food_radius = newState[Config_2.KEY_FOOD][Config_2.KEY_RADIUS];
                            this.state.food_length++;
                        }
                    }
                    this.state.enemies = newState[Config_2.KEY_ENEMIES];
                    this.state.enemies_length = 0;
                    for (let property in this.state.enemies) {
                        if (Object.prototype.hasOwnProperty.call(this.state.enemies, property)) {
                            this.state.enemies_width = newState[Config_2.KEY_ENEMIES][Config_2.KEY_RADIUS];
                            this.state.enemies_radius = newState[Config_2.KEY_ENEMIES][Config_2.KEY_RADIUS];
                            this.state.enemies_length++;
                        }
                    }
                });
            });
            socket.emit('disconnect');
            window.addEventListener("resize", () => {
                this._resize();
            });
            this._resize();
            //requestAnimationFrame(this.onLoop.bind(this));
            setInterval(() => {
                this.onLoop();
            }, 1000 / 30);
        }
        _update() {
            this._mouseCoordinates();
        }
        _mouseCoordinates() {
            addEventListener("mousemove", (event) => {
                this.movement["x"] = (event.offsetX / this.canvas.clientWidth);
                this.movement["y"] = (event.offsetY / this.canvas.clientHeight);
                socket.emit(Config_2.KEY_MOVEMENT, JSON.stringify(this.movement));
            });
        }
        onLoop() {
            this._update();
            this.draw.paint(this.context, this.canvas, this.state.players, this.movement, this.player, this.field, this.start, this.state.food_length, this.state.enemies_length, this.state.food, this.state.enemies);
            //requestAnimationFrame(this.onLoop.bind(this));
        }
        _resize() {
            let canvas = this.canvas;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
            return false;
        }
    }
    const game = new Game;
});
