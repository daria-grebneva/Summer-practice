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
var MAX_FOOD_NUMBER = 40;
var SMALL_BALL_SIZE = 7 / 2000;
var SMALL_BALL_RADIUS = 2 / 700;
var MAX_RADIUS = 300 / 2000;

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
var KEY_MOVEMENT = "m";
var KEY_NEW_PLAYER = "n";
var KEY_UPDATE_DATA = "u";
var KEY_FOOD = "f";
var KEY_PLAYERS = "p";
var KEY_ENEMIES = "e";
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
exports.MAX_RADIUS = MAX_RADIUS;
exports.KEY_MOVEMENT = KEY_MOVEMENT;
exports.KEY_NEW_PLAYER = KEY_NEW_PLAYER;
exports.KEY_UPDATE_DATA = KEY_UPDATE_DATA;
exports.KEY_FOOD = KEY_FOOD;
exports.KEY_PLAYERS = KEY_PLAYERS;
exports.KEY_ENEMIES = KEY_ENEMIES;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Config = __webpack_require__(0);

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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(state[_Config.KEY_PLAYERS])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var g = _step.value;


            if (this._radiusVisibility(state[_Config.KEY_PLAYERS][g], state[_Config.KEY_ENEMIES][j], _Config.CONVERGENCE_RADIUS)) {
              this.movePlayer(state[_Config.KEY_PLAYERS][g].x, state[_Config.KEY_PLAYERS][g].y, state[_Config.KEY_ENEMIES][j]);
            } else {
              this.movePlayer(this._findNearestFoodCoordinate(state[_Config.KEY_ENEMIES][j], state).x, this._findNearestFoodCoordinate(state[_Config.KEY_ENEMIES][j], state).y, state[_Config.KEY_ENEMIES][j]);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: 'checkBorder',
    value: function checkBorder(coord) {
      var newCoord = void 0;
      if (coord < 0) {
        newCoord = 0;
      } else if (coord > 1) {
        newCoord = 1;
      } else {
        newCoord = coord;
      }
      return newCoord;
    }
  }, {
    key: 'movePlayer',
    value: function movePlayer(coordX, coordY, obj) {
      coordX = this.checkBorder(coordX);
      coordY = this.checkBorder(coordY);
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
      for (var i = 0; _Config.MAX_ENEMY_NUMBER - enemies.length >= 1; i++) {
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
      state[_Config.KEY_PLAYERS][id] = {
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
        newCoordinate_x = Math.abs(enemy.x - state[_Config.KEY_FOOD][i].x);
        newCoordinate_y = Math.abs(enemy.y - state[_Config.KEY_FOOD][i].y);
        if (newCoordinate_x < coordinate_x && newCoordinate_y < coordinate_y) {
          coordinate_x = newCoordinate_x;
          coordinate_y = newCoordinate_y;
          numberNearestFood = i;
        }
        if (i == _Config.MAX_FOOD_NUMBER - 1) {
          return { x: state[_Config.KEY_FOOD][numberNearestFood].x, y: state[_Config.KEY_FOOD][numberNearestFood].y };
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
      if (first_obj.x - second_obj.x <= radius && first_obj.x + second_obj.radius / 2 - second_obj.x > 0) return true;
    }
  }, {
    key: '_positionLeft',
    value: function _positionLeft(first_obj, second_obj, radius) {
      if (second_obj.x - first_obj.x <= radius && second_obj.x + second_obj.radius / 2 - first_obj.x > 0) return true;
    }
  }, {
    key: '_positionUp',
    value: function _positionUp(first_obj, second_obj, radius) {
      if (second_obj.y - first_obj.y < radius && second_obj.y + second_obj.radius / 2 - first_obj.y > 0) return true;
    }
  }, {
    key: '_positionDown',
    value: function _positionDown(first_obj, second_obj, radius) {
      if (first_obj.y - second_obj.y < radius && first_obj.y + second_obj.radius / 2 - second_obj.y > 0) return true;
    }
  }]);

  return MovementController;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = undefined;

var _CollisionChecker = __webpack_require__(3);

var _MovementController = __webpack_require__(1);

var _NewPlayer = __webpack_require__(5);

var _Config = __webpack_require__(0);

var express = __webpack_require__(6);
var http = __webpack_require__(7);
var path = __webpack_require__(8);
var socketIO = __webpack_require__(9);
var app = express();
var server = http.Server(app);
var io = exports.io = socketIO(server);
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
  "p": {},
  "f": movementController.foodPositions(food),
  "e": movementController.enemiesPositions(enemies)
};

io.on('connection', function (socket) {
  _NewPlayer.NewPlayer.create(socket, state);
  socket.on('disconnect', function () {
    delete state[_Config.KEY_PLAYERS][socket.id];
  });

  socket.on(_Config.KEY_MOVEMENT, function (data) {
    var newData = JSON.parse(data);
    var player = state[_Config.KEY_PLAYERS][socket.id] || {};
    movementController.movePlayer(newData["x"], newData["y"], player);
    collisionChecker.check(socket, state, food, enemies);
    movementController.moveEnemy(state);
  });
});

setInterval(function (socket) {
  collisionChecker.check(socket, state, food, enemies);
  movementController.moveEnemy(state);
  io.sockets.emit(_Config.KEY_UPDATE_DATA, JSON.stringify(state));
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

var _MovementController = __webpack_require__(1);

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var movementController = new _MovementController.MovementController();

var CollisionChecker = exports.CollisionChecker = function () {
  function CollisionChecker() {
    _classCallCheck(this, CollisionChecker);
  }

  _createClass(CollisionChecker, [{
    key: 'check',
    value: function check(socket, state, food, enemies) {
      //ENEMY
      for (var j = 0; j < _Config.MAX_ENEMY_NUMBER; j++) {
        //collision enemy <-> enemy
        for (var k = 0; k != _Config.MAX_ENEMY_NUMBER; k++) {
          if (this._canEat(state[_Config.KEY_ENEMIES][k], state[_Config.KEY_ENEMIES][j])) {
            state[_Config.KEY_ENEMIES].splice(j, 1);
            movementController.enemiesPositions(enemies);
          } else if (this._canEat(state[_Config.KEY_ENEMIES][j], state[_Config.KEY_ENEMIES][k])) {
            state[_Config.KEY_ENEMIES].splice(k, 1);
            movementController.enemiesPositions(enemies);
          }
        }
        //collision enemy <-> food
        for (var i = 0; i < _Config.MAX_FOOD_NUMBER; i++) {
          if (this._canEat(state[_Config.KEY_ENEMIES][j], state[_Config.KEY_FOOD][i])) {
            state[_Config.KEY_FOOD].splice(i, 1);
            movementController.foodPositions(food);
          }
        }
      }

      //PLAYER
      for (var g in state[_Config.KEY_PLAYERS]) {
        //collision player <-> enemy
        for (var _k = 0; _k != _Config.MAX_ENEMY_NUMBER; _k++) {
          if (this._canEat(state[_Config.KEY_ENEMIES][_k], state[_Config.KEY_PLAYERS][g])) {
            movementController.playersPositions(g, state);
          } else if (this._canEat(state[_Config.KEY_PLAYERS][g], state[_Config.KEY_ENEMIES][_k])) {
            state[_Config.KEY_ENEMIES].splice(_k, 1);
            movementController.enemiesPositions(enemies);
          }
        }
        //collision player <-> player
        for (var _k2 in state[_Config.KEY_PLAYERS]) {
          if (this._canEat(state[_Config.KEY_PLAYERS][_k2], state[_Config.KEY_PLAYERS][g])) {
            movementController.playersPositions(g, state);
          }
        }
        //collision player <-> food
        for (var _i = 0; _i < _Config.MAX_FOOD_NUMBER; _i++) {
          if (this._canEat(state[_Config.KEY_PLAYERS][g], state[_Config.KEY_FOOD][_i])) {
            state[_Config.KEY_FOOD].splice(_i, 1);
            movementController.foodPositions(food);
          }
        }
      }
    }
  }, {
    key: '_canEat',
    value: function _canEat(predator, victim) {
      if (predator.radius > victim.radius && this._checkCollision(predator, victim)) {
        return true;
      }
    }
  }, {
    key: '_checkCollision',
    value: function _checkCollision(predator, victim) {
      if (Math.abs(predator.x + predator.radius - victim.x - victim.radius) < victim.radius + predator.radius && Math.abs(predator.y + predator.radius - victim.y - victim.radius) < victim.radius + predator.radius) {
        if (predator.radius < _Config.MAX_RADIUS) {
          predator.radius = Math.hypot(predator.radius, victim.radius);
        }
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
    /*static randomColor() {
      let R = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
      let G = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
      let B = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
      let list = '';
      list = '{' + R + ', ' + G + ', ' + B + '}';
      return list;
    }*/

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

var _MovementController = __webpack_require__(1);

var _Config = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var movementController = new _MovementController.MovementController();

var NewPlayer = exports.NewPlayer = function () {
  function NewPlayer() {
    _classCallCheck(this, NewPlayer);
  }

  _createClass(NewPlayer, null, [{
    key: 'create',
    value: function create(socket, state) {
      socket.on(_Config.KEY_NEW_PLAYER, function () {
        movementController.playersPositions(socket.id, state);
        socket.emit("player_created", state[_Config.KEY_PLAYERS][socket.id]);
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