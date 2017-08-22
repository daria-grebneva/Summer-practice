'use strict';
import {checkEaten} from './canEat';
import {enemiesMove} from './enemiesMove';
import {move} from './enemiesMove';
import {newPlayer} from './newPlayer';
import {initFoodPositions} from './initFoodPositions';
import {initEnemiesPositions} from './initEnemiesPositions';

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

let state = {
  "players": {},
  "food": initFoodPositions(food),
  "enemies": initEnemiesPositions(enemies),
};

io.on('connection', function (socket) {
  newPlayer(socket, state);

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
    let player = state.players[socket.id] || {};
    move(data.x, data.y, player);
    checkEaten(socket, state, food, enemies);
    enemiesMove(state);
  });
});

setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);
//TODO :: узнать, почему притормаживает если поиграть??