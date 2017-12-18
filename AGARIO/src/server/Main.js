'use strict';
import {CollisionChecker} from './CollisionChecker';
import {MovementController} from './MovementController';
import {NewPlayer} from './NewPlayer';
import {Initializer} from './InitializerPosition';
import {
  KEY_MOVEMENT,
  KEY_UPDATE_DATA,
  KEY_PLAYERS
} from './Config';

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
export const io = socketIO(server);
const dirname = "./";
const food = [];
const enemies = [];

app.set('port', 5000);

app.use(express.static('./'));

app.get('/', function (request, response) {
  response.sendFile('index.html', {root: dirname});
});

server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

const collisionChecker = new CollisionChecker();
const movementController = new MovementController();
const initializer = new Initializer();

let state = {
  "p": {},
  "f": initializer.foodPosition(food),
  "e": initializer.enemiesPosition(enemies)
};

io.on('connection',  function (socket) {
  NewPlayer.create(socket, state);

  socket.on('disconnect', function () {
    delete state[KEY_PLAYERS][socket.id];
  });

  socket.on(KEY_MOVEMENT, function (data) {
    let newData = JSON.parse(data);
    let  player = state[KEY_PLAYERS][socket.id];
    movementController.movePlayer(newData["x"], newData["y"], player);
    collisionChecker.check(state, food, enemies);
    movementController.moveEnemy(state);
  });
});

setInterval(function () {
  collisionChecker.check(state, food, enemies);
  movementController.moveEnemy(state);
  if (state[KEY_PLAYERS].size > 1)
  {
    state[KEY_PLAYERS].sort((playerOne, playerTwo) => {
      const scoreOne = playerOne.radius;
      const scoreTwo = playerTwo.radius;
      return scoreOne - scoreTwo;
    });
  }
  io.sockets.emit(KEY_UPDATE_DATA, JSON.stringify(state));
}, 1000 / 60);