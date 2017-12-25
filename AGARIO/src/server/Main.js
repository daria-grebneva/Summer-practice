'use strict';
import {CollisionChecker} from './CollisionChecker';
import {MovementController} from './MovementController';
import {NewPlayer} from './NewPlayer';
import {Initializer} from './InitializerPosition';
import {
  KEY_MOVEMENT,
  KEY_UPDATE_DATA,
  KEY_PLAYERS,
  KEY_RADIUS,
  KEY_TABLE,
  KEY_NICKNAME
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
  "e": initializer.enemiesPosition(enemies),
  "z": {}
};

let table = [];

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
  table = [];
  state[KEY_TABLE] = {};
  const keys = Object.keys(state[KEY_PLAYERS]);
  let i, len = keys.length;
  for (i = 0; i < len; i++) {
    let k = keys[i];
    let radius = state[KEY_PLAYERS][k][KEY_RADIUS];
    let nickname = state[KEY_PLAYERS][k][KEY_NICKNAME];
    let infoBox = [radius, nickname];
    table.push(infoBox);
  }
  if (table.length > 1)
  {
    table.sort((playerOne, playerTwo) => {
        const scoreOne = playerOne[0];
        const scoreTwo = playerTwo[0];
        return scoreTwo - scoreOne;
      });
  }
  for (i = 0; i < len; i++)
  {
    state[KEY_TABLE][i] = table[i][1];
  }
  io.sockets.emit(KEY_UPDATE_DATA, JSON.stringify(state));
}, 1000 / 60);