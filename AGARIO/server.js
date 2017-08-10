const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const MAX_DOTS_NUMBER = 40;

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'agario.html'));
});

server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let colorNum = '#';
  for (let i = 0; i < 6; i++) {
    colorNum += letters[Math.floor(Math.random() * 16)];
  }
  return colorNum;
}

function getRandomCoordinates(min, max) {
  return Math.random() * (max - min) + min;
}

function initDotsPositions() {
  const dots = [];
  for (let i = 0; i < MAX_DOTS_NUMBER; i++) {
    dots.push({
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1),
      color: getRandomColor(),
    })
  }
  return dots;
}

function move(coordX, coordY, acceleration, obj) {
  let xDistance = coordX - obj.x;
  let yDistance = coordY - obj.y;
  let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  if (distance > 0) {
    obj.x += xDistance * acceleration;
    obj.y += yDistance * acceleration;
  }
}

let state = {
  "players": {},
  "dots": initDotsPositions(),
};

io.on('connection', function (socket) {

  socket.on('new player', function () {
    state.players[socket.id] = {
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1)
    };
    socket.emit("player_created", state.players[socket.id]);
  });

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
    let player = state.players[socket.id] || {};
    move(data.x, data.y, data.acceleration, player);
    //TODO:: check collisions!
  });

});
setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);