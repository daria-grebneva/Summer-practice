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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Config = __webpack_require__(1);

var _Utils = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovementController = exports.MovementController = function () {
  function MovementController() {
    _classCallCheck(this, MovementController);
  }

  _createClass(MovementController, [{
    key: 'moveEnemy',
    value: function moveEnemy(state) {
      for (var j = 0; j < _Config.MAX_ENEMY_NUMBER; j++) {
        for (var g in state.players) {
          if (this._radiusVisibility(state.players[g], state.enemies[j], _Config.CONVERGENCE_RADIUS)) {
            this.movePlayer(state.players[g].x, state.players[g].y, state.enemies[j]);
          } else {
            this.movePlayer(this._findNearestFoodCoordinate(state.enemies[j], state).x, this._findNearestFoodCoordinate(state.enemies[j], state).y, state.enemies[j]);
          }
        }
      }
    }
  }, {
    key: 'movePlayer',
    value: function movePlayer(coordX, coordY, obj) {
      var xDistance = coordX - obj.x;
      var yDistance = coordY - obj.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance > 0) {
        obj.x += xDistance * obj.acceleration;
        obj.y += yDistance * obj.acceleration;
      }
    }
  }, {
    key: 'foodPositions',
    value: function foodPositions(food) {
      for (var i = 0; _Config.MAX_FOOD_NUMBER - food.length > 0; i++) {
        food.push({
          x: _Utils.Utils.randomCoordinates(0, 1),
          y: _Utils.Utils.randomCoordinates(0, 1),
          color: _Utils.Utils.randomColor(),
          width: _Config.SMALL_BALL_SIZE,
          height: _Config.SMALL_BALL_SIZE,
          radius: _Config.SMALL_BALL_RADIUS
        });
      }
      return food;
    }
  }, {
    key: 'enemiesPositions',
    value: function enemiesPositions(enemies) {
      for (var i = 0; _Config.MAX_ENEMY_NUMBER - enemies.length > 0; i++) {
        enemies.push({
          x: _Utils.Utils.randomCoordinates(0, 1),
          y: _Utils.Utils.randomCoordinates(0, 1),
          color: _Utils.Utils.randomColor(),
          width: _Config.ENEMY_SIZE,
          height: _Config.ENEMY_SIZE,
          radius: _Config.ENEMY_RADIUS,
          acceleration: _Config.ENEMY_ACCELERATION
        });
      }
      return enemies;
    }
  }, {
    key: 'playersPositions',
    value: function playersPositions(id, state) {
      state.players[id] = {
        x: _Utils.Utils.randomCoordinates(0, 1),
        y: _Utils.Utils.randomCoordinates(0, 1),
        radius: _Config.PLAYER_RADIUS,
        color: _Utils.Utils.randomColor(),
        width: _Config.PLAYER_SIZE,
        height: _Config.PLAYER_SIZE,
        acceleration: _Config.PLAYER_ACCELERATION
      };
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

  return MovementController;
}();

/***/ }),
/* 1 */
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
exports.RESIZE_COEF = RESIZE_COEF;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CollisionChecker = __webpack_require__(3);

var _MovementController = __webpack_require__(0);

var _NewPlayer = __webpack_require__(5);

var express = __webpack_require__(6);
var http = __webpack_require__(7);
var path = __webpack_require__(8);
var socketIO = __webpack_require__(9);
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

var collisionChecker = new _CollisionChecker.CollisionChecker();
var movementController = new _MovementController.MovementController();

var state = {
  "players": {},
  "food": movementController.foodPositions(food), //FoodPositions.init(food),
  "enemies": movementController.enemiesPositions(enemies) //EnemiesPositions.init(enemies),
};

io.on('connection', function (socket) {
  _NewPlayer.NewPlayer.create(socket, state);

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
    var player = state.players[socket.id] || {};
    movementController.movePlayer(data.x, data.y, player);
    collisionChecker.check(socket, state, food, enemies);
    movementController.moveEnemy(state);
  });
});

setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionChecker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovementController = __webpack_require__(0);

var _Config = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var movementController = new _MovementController.MovementController();

var CollisionChecker = exports.CollisionChecker = function () {
  function CollisionChecker() {
    _classCallCheck(this, CollisionChecker);
  }

  _createClass(CollisionChecker, [{
    key: 'check',
    value: function check(socket, state, food, enemies) {
      for (var i = 0; i < _Config.MAX_FOOD_NUMBER; i++) {
        for (var j = 0; j < _Config.MAX_ENEMY_NUMBER; j++) {
          for (var g in state.players) {
            if (this._canEat(state.players[g], state.food[i]) || this._canEat(state.enemies[j], state.food[i])) {
              state.food.splice(i, 1);
              movementController.foodPositions(food);
            }
            if (this._canEat(state.enemies[j], state.players[g])) {
              movementController.playersPositions(g, state);
            } else if (this._canEat(state.players[g], state.enemies[j])) {
              state.enemies.splice(j, 1);
              movementController.enemiesPositions(enemies);
            }
            for (var k in state.players) {
              if (this._canEat(state.players[k], state.players[g])) {
                movementController.playersPositions(g, state);
              }
            }
          }
          for (var _k = 0; _k != _Config.MAX_ENEMY_NUMBER; _k++) {
            if (this._canEat(state.enemies[_k], state.enemies[j])) {
              state.enemies.splice(j, 1);
              movementController.enemiesPositions(enemies);
            } else if (this._canEat(state.enemies[j], state.enemies[_k])) {
              state.enemies.splice(_k, 1);
              movementController.enemiesPositions(enemies);
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

  return CollisionChecker;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = exports.Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
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

  return Utils;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovementController = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var movementController = new _MovementController.MovementController();

var NewPlayer = exports.NewPlayer = function () {
  function NewPlayer() {
    _classCallCheck(this, NewPlayer);
  }

  _createClass(NewPlayer, null, [{
    key: 'create',
    value: function create(socket, state) {
      socket.on('new player', function () {
        movementController.playersPositions(socket.id, state);
        socket.emit("player_created", state.players[socket.id]);
      });
    }
  }]);

  return NewPlayer;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);