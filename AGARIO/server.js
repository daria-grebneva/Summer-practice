var myApp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAX_FOOD_NUMBER = 40;
var SMALL_BALL_SIZE = 7 / 2000;
var SMALL_BALL_RADIUS = 2 / 700;

var PLAYER_SIZE = 10 / 2000;
var PLAYER_RADIUS = 5 / 700;
var PLAYER_ACCELERATION = 0.09;

var CONVERGENCE_RADIUS = 1 / 25;

var MAX_ENEMY_NUMBER = 6;
var ENEMY_SIZE = 11 / 2000;
var ENEMY_RADIUS = 5 / 700;
var ENEMY_ACCELERATION = 0.01;

var LOW_ACCELERATION = 0.0045;
var FIELD_COLOR = 'rgba(238, 238, 254, 0.8)';
var FONT_COLOR = '#937cdd';
var CANVAS_SCALE = 55;
var X_REVIEW = 3800;
var Y_REVIEW = 1840;
var RESIZE_COEF = 0.505;
exports.MAX_FOOD_NUMBER = MAX_FOOD_NUMBER;
exports.SMALL_BALL_SIZE = SMALL_BALL_SIZE;
exports.SMALL_BALL_RADIUS = SMALL_BALL_RADIUS;
exports.PLAYER_SIZE = PLAYER_SIZE;
exports.PLAYER_RADIUS = PLAYER_RADIUS;
exports.PLAYER_ACCELERATION = PLAYER_ACCELERATION;
exports.CONVERGENCE_RADIUS = CONVERGENCE_RADIUS;
exports.MAX_ENEMY_NUMBER = MAX_ENEMY_NUMBER;
exports.ENEMY_SIZE = ENEMY_SIZE;
exports.ENEMY_RADIUS = ENEMY_RADIUS;
exports.ENEMY_ACCELERATION = ENEMY_ACCELERATION;
exports.LOW_ACCELERATION = LOW_ACCELERATION;
exports.FIELD_COLOR = FIELD_COLOR;
exports.FONT_COLOR = FONT_COLOR;
exports.CANVAS_SCALE = CANVAS_SCALE;
exports.X_REVIEW = X_REVIEW;
exports.Y_REVIEW = Y_REVIEW;
exports.RESIZE_COEF = RESIZE_COEF;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Make = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Make = exports.Make = function () {
  function Make() {
    _classCallCheck(this, Make);
  }

  _createClass(Make, null, [{
    key: 'rebirth',
    value: function rebirth(id, state) {
      state.players[id] = {
        x: this.randomCoordinates(0, 1),
        y: this.randomCoordinates(0, 1),
        radius: _Config.PLAYER_RADIUS,
        color: this.randomColor(),
        width: _Config.PLAYER_SIZE,
        height: _Config.PLAYER_SIZE,
        acceleration: _Config.PLAYER_ACCELERATION
      };
    }
  }, {
    key: 'randomCoordinates',
    value: function randomCoordinates(min, max) {
      return Math.random() * (max - min) + min;
    }
  }, {
    key: 'randomColor',
    value: function randomColor() {
      var letters = '0123456789ABCDEF';
      var colorNum = '#';
      for (var i = 0; i < 6; i++) {
        colorNum += letters[Math.floor(Math.random() * 16)];
      }
      return colorNum;
    }
  }]);

  return Make;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodPositions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rebirth = __webpack_require__(1);

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoodPositions = exports.FoodPositions = function () {
  function FoodPositions() {
    _classCallCheck(this, FoodPositions);
  }

  _createClass(FoodPositions, null, [{
    key: 'init',
    value: function init(food) {
      for (var i = 0; _Config.MAX_FOOD_NUMBER - food.length > 0; i++) {
        food.push({
          x: _Rebirth.Make.randomCoordinates(0, 1),
          y: _Rebirth.Make.randomCoordinates(0, 1),
          color: _Rebirth.Make.randomColor(),
          width: _Config.SMALL_BALL_SIZE,
          height: _Config.SMALL_BALL_SIZE,
          radius: _Config.SMALL_BALL_RADIUS
        });
      }
      return food;
    }
  }]);

  return FoodPositions;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnemiesPositions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rebirth = __webpack_require__(1);

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnemiesPositions = exports.EnemiesPositions = function () {
  function EnemiesPositions() {
    _classCallCheck(this, EnemiesPositions);
  }

  _createClass(EnemiesPositions, null, [{
    key: 'init',
    value: function init(enemies) {
      for (var i = 0; _Config.MAX_ENEMY_NUMBER - enemies.length > 0; i++) {
        enemies.push({
          x: _Rebirth.Make.randomCoordinates(0, 1),
          y: _Rebirth.Make.randomCoordinates(0, 1),
          color: _Rebirth.Make.randomColor(),
          width: _Config.ENEMY_SIZE,
          height: _Config.ENEMY_SIZE,
          radius: _Config.ENEMY_RADIUS,
          acceleration: _Config.ENEMY_ACCELERATION
        });
      }
      return enemies;
    }
  }]);

  return EnemiesPositions;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CanEat = __webpack_require__(5);

var _EnemiesMove = __webpack_require__(6);

var _NewPlayer = __webpack_require__(7);

var _InitFoodPositions = __webpack_require__(2);

var _InitEnemiesPositions = __webpack_require__(3);

var express = __webpack_require__(8);
var http = __webpack_require__(9);
var path = __webpack_require__(10);
var socketIO = __webpack_require__(11);
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var dirname = "./";
var food = [];
var enemies = [];

app.set('port', 5000);

app.use(express.static('./'));

app.get('/', function (request, response) {
  response.sendFile('index.html', { root: dirname });
});

server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

var state = {
  "players": {},
  "food": _InitFoodPositions.FoodPositions.init(food),
  "enemies": _InitEnemiesPositions.EnemiesPositions.init(enemies)
};

io.on('connection', function (socket) {
  _NewPlayer.Player.new(socket, state);

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
    var player = state.players[socket.id] || {};
    _EnemiesMove.Motion.playerMove(data.x, data.y, player);
    _CanEat.Eating.check(socket, state, food, enemies);
    _EnemiesMove.Motion.enemy(state);
  });
});

setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);
//TODO :: узнать, почему притормаживает если поиграть??

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eating = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rebirth = __webpack_require__(1);

var _InitFoodPositions = __webpack_require__(2);

var _InitEnemiesPositions = __webpack_require__(3);

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eating = exports.Eating = function () {
  function Eating() {
    _classCallCheck(this, Eating);
  }

  _createClass(Eating, null, [{
    key: 'check',
    value: function check(socket, state, food, enemies) {
      for (var i = 0; i < _Config.MAX_FOOD_NUMBER; i++) {
        for (var j = 0; j < _Config.MAX_ENEMY_NUMBER; j++) {
          for (var g in state.players) {
            if (this._canEat(state.players[g], state.food[i]) || this._canEat(state.enemies[j], state.food[i])) {
              state.food.splice(i, 1);
              _InitFoodPositions.FoodPositions.init(food);
            }
            if (this._canEat(state.enemies[j], state.players[g])) {
              _Rebirth.Make.rebirth(g, state);
            } else if (this._canEat(state.players[g], state.enemies[j])) {
              state.enemies.splice(j, 1);
              _InitEnemiesPositions.EnemiesPositions.init(enemies);
            }
            for (var k in state.players) {
              if (this._canEat(state.players[k], state.players[g])) {
                _Rebirth.Make.rebirth(g, state);
              }
            }
          }
          for (var _k = 0; _k != _Config.MAX_ENEMY_NUMBER; _k++) {
            if (this._canEat(state.enemies[_k], state.enemies[j])) {
              state.enemies.splice(j, 1);
              _InitEnemiesPositions.EnemiesPositions.init(enemies);
            } else if (this._canEat(state.enemies[j], state.enemies[_k])) {
              state.enemies.splice(_k, 1);
              _InitEnemiesPositions.EnemiesPositions.init(enemies);
            }
          }
        }
      }
    }
  }, {
    key: '_canEat',
    value: function _canEat(predator, victim) {
      if (predator.width > victim.width && this._checkCollision(predator, victim) == true) {
        return true;
      }
    }
  }, {
    key: '_checkCollision',
    value: function _checkCollision(predator, victim) {
      if (predator.x - predator.width / 2 - victim.width / 2 < victim.x && victim.x < predator.x + predator.width / 2 + victim.width / 2 && predator.y - predator.height - victim.height < victim.y && victim.y < predator.y + predator.height + victim.height) {
        predator.width = predator.width + victim.width * victim.width;
        predator.height = predator.height + victim.height * victim.width;
        predator.radius = predator.radius + victim.radius * victim.width;
        if (predator.acceleration > _Config.LOW_ACCELERATION) {
          predator.acceleration = predator.acceleration - predator.acceleration * victim.width;
        }
        return true;
      }
    }
  }]);

  return Eating;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Motion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Motion = exports.Motion = function () {
  function Motion() {
    _classCallCheck(this, Motion);
  }

  _createClass(Motion, null, [{
    key: 'enemy',
    value: function enemy(state) {
      for (var j = 0; j < _Config.MAX_ENEMY_NUMBER; j++) {
        for (var g in state.players) {
          if (this._radiusVisibility(state.players[g], state.enemies[j], _Config.CONVERGENCE_RADIUS)) {
            this.playerMove(state.players[g].x, state.players[g].y, state.enemies[j]);
          } else {
            this.playerMove(this._findNearestFoodCoordinate(state.enemies[j], state).x, this._findNearestFoodCoordinate(state.enemies[j], state).y, state.enemies[j]);
          }
        }
      }
    }
  }, {
    key: 'playerMove',
    value: function playerMove(coordX, coordY, obj) {
      var xDistance = coordX - obj.x;
      var yDistance = coordY - obj.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance > 0) {
        obj.x += xDistance * obj.acceleration;
        obj.y += yDistance * obj.acceleration;
      }
    }
  }, {
    key: '_findNearestFoodCoordinate',
    value: function _findNearestFoodCoordinate(enemy, state) {
      var coordinate_x = 1;
      var coordinate_y = 1;
      var newCoordinate_x = 0;
      var newCoordinate_y = 0;
      var numberNearestFood = 0;
      for (var i = 0; i != _Config.MAX_FOOD_NUMBER; i++) {
        newCoordinate_x = Math.abs(enemy.x - state.food[i].x);
        newCoordinate_y = Math.abs(enemy.y - state.food[i].y);
        if (newCoordinate_x < coordinate_x && newCoordinate_y < coordinate_y) {
          coordinate_x = newCoordinate_x;
          coordinate_y = newCoordinate_y;
          numberNearestFood = i;
        }
        if (i == _Config.MAX_FOOD_NUMBER - 1) {
          return { x: state.food[numberNearestFood].x, y: state.food[numberNearestFood].y };
        }
      }
    }
  }, {
    key: '_radiusVisibility',
    value: function _radiusVisibility(first_obj, second_obj, radius) {
      return (this._positionRight(first_obj, second_obj, radius) || this._positionLeft(first_obj, second_obj, radius)) && (this._positionDown(first_obj, second_obj, radius) || this._positionUp(first_obj, second_obj, radius));
    }
  }, {
    key: '_positionRight',
    value: function _positionRight(first_obj, second_obj, radius) {
      if (first_obj.x - second_obj.x <= radius && first_obj.x + second_obj.width / 2 - second_obj.x > 0) return true;
    }
  }, {
    key: '_positionLeft',
    value: function _positionLeft(first_obj, second_obj, radius) {
      if (second_obj.x - first_obj.x <= radius && second_obj.x + second_obj.width / 2 - first_obj.x > 0) return true;
    }
  }, {
    key: '_positionUp',
    value: function _positionUp(first_obj, second_obj, radius) {
      if (second_obj.y - first_obj.y < radius && second_obj.y + second_obj.height / 2 - first_obj.y > 0) return true;
    }
  }, {
    key: '_positionDown',
    value: function _positionDown(first_obj, second_obj, radius) {
      if (first_obj.y - second_obj.y < radius && first_obj.y + second_obj.height / 2 - second_obj.y > 0) return true;
    }
  }]);

  return Motion;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rebirth = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
  function Player() {
    _classCallCheck(this, Player);
  }

  _createClass(Player, null, [{
    key: 'new',
    value: function _new(socket, state) {
      socket.on('new player', function () {
        _Rebirth.Make.rebirth(socket.id, state);
        socket.emit("player_created", state.players[socket.id]);
      });
    }
  }]);

  return Player;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);