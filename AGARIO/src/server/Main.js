'use strict';
import {Eating} from './CanEat';
import {Motion} from './EnemiesMove';
import {Player} from './NewPlayer';
import {FoodPositions} from './InitFoodPositions';
import {EnemiesPositions} from './InitEnemiesPositions';

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
  "food": FoodPositions.init(food),
  "enemies": EnemiesPositions.init(enemies),
};

io.on('connection', function (socket) {
  Player.new(socket, state);

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
    let player = state.players[socket.id] || {};
    Motion.playerMove(data.x, data.y, player);
    Eating.check(socket, state, food, enemies);
    Motion.enemy(state);
  });
});

setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);
//TODO :: узнать, почему притормаживает если поиграть??