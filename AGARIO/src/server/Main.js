'use strict';
import {CollisionChecker} from './CollisionChecker';
import {MovementController} from './MovementController';
import {NewPlayer} from './NewPlayer';

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);
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

let state = {
  "players": {},
  "food": movementController.foodPositions(food),//FoodPositions.init(food),
  "enemies": movementController.enemiesPositions(enemies),//EnemiesPositions.init(enemies),
};

io.on('connection', function (socket) {
  NewPlayer.create(socket, state);

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
   let  player = state.players[socket.id] || {};
    movementController.movePlayer(data.x, data.y, player);
    collisionChecker.check(socket, state, food, enemies);
    movementController.moveEnemy(state);
  });
});

setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);