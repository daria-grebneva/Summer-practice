const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const MAX_DOTS_NUMBER = 40;
const SMALL_BALL_SIZE = 8 / 2000;

const PLAYER_SIZE = 10 / 2000;
const PLAYER_RADIUS = 5 / 700;

const LOW_ACCELERATION = 0.0045;
const dots = [];

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

  for (let i = 0; MAX_DOTS_NUMBER - dots.length > 0; i++) {
    dots.push({
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1),
      color: getRandomColor(),
      width: SMALL_BALL_SIZE,
      height: SMALL_BALL_SIZE,
    })
  }
  return dots;
}

/*function addDot() {
 for (let i = 0; MAX_DOTS_NUMBER - state.dots.length > 0; i++) {
 this.dots.push(new Dot(this.context, this.canvas, this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, this._getRandomColor(), SMALL_BALL_RADIUS));
 }

 }*/

function move(coordX, coordY, acceleration, obj) {
  let xDistance = coordX - obj.x;
  let yDistance = coordY - obj.y;
  let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  if (distance > 0) {
    obj.x += xDistance * acceleration;
    obj.y += yDistance * acceleration;
  }
}


function checkCollision(predator, victim) {
  if (((predator.x - predator.width / 2 - victim.width / 2) < victim.x
    && victim.x < (predator.x + predator.width / 2 + victim.width / 2))
    && ((predator.y - predator.height - victim.height) < victim.y
    && victim.y < (predator.y + predator.height + victim.height) )) {
    predator.width = predator.width + victim.width * victim.width;
    predator.height = predator.height + victim.height * victim.width;
    predator.radius = predator.radius + victim.radius * victim.width;
    if (predator.acceleration < LOW_ACCELERATION) {
      predator.acceleration = predator.acceleration - predator.acceleration * victim.width;
    }
    return true;
  }
}

function canEat(predator, victim) {
  if ((predator.width > victim.width) && (checkCollision(predator, victim) == true)) {
    return true
  }
}

let state = {
  "players": {},
  "dots": initDotsPositions(),
  "eat": false,
};

io.on('connection', function (socket) {

  socket.on('new player', function () {
    state.players[socket.id] = {
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1),
      radius: PLAYER_RADIUS,
      color: getRandomColor(),
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
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
    for (let i = 0; i < MAX_DOTS_NUMBER; i++) {
      // console.log(state.dots[i].width);
      if (canEat(data, state.dots[i])) {
        state.dots.splice(i, 1);
        initDotsPositions();
        socket.emit("collision dot");
      }
    }

  });


//  socket.emit("collision", state.players[socket.id]);


});
setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);