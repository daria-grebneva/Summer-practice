const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const MAX_DOTS_NUMBER = 40;
const SMALL_BALL_SIZE = 7 / 2000;
const SMALL_BALL_RADIUS = 2 / 700;

const PLAYER_SIZE = 10 / 2000;
const PLAYER_RADIUS = 5 / 700;
const PLAYER_ACCELERATION = 0.2;

const CONVERGENCE_RADIUS = 1 / 25;

const MAX_ENEMY_NUMBER = 6;
const ENEMY_SIZE = 9 / 2000;
const ENEMY_RADIUS = 5 / 700;
const ENEMY_ACCELERATION = 0.09;

const LOW_ACCELERATION = 0.0045;
const dots = [];
const enemies = [];

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

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
      radius: SMALL_BALL_RADIUS,
    })
  }
  return dots;
}

function initEnemiesPositions() {
  for (let i = 0; MAX_ENEMY_NUMBER - enemies.length > 0; i++) {
    enemies.push({
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1),
      color: getRandomColor(),
      width: ENEMY_SIZE,
      height: ENEMY_SIZE,
      radius: ENEMY_RADIUS,
      acceleration: ENEMY_ACCELERATION,
    })
  }
  return enemies;
}

function move(coordX, coordY, obj) {
  let xDistance = coordX - obj.x;
  let yDistance = coordY - obj.y;
  let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  if (distance > 0) {
    obj.x += xDistance * obj.acceleration;
    obj.y += yDistance * obj.acceleration;
  }
}

function findNearestDotCoordinate(enemy) {
  let coordinate_x = 1;
  let coordinate_y = 1;
  let newCoordinate_x = 0;
  let newCoordinate_y = 0;
  let numberNearestDot = 0;
  for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
    newCoordinate_x = Math.abs(enemy.x - state.dots[i].x);
    newCoordinate_y = Math.abs(enemy.y - state.dots[i].y);
    if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
      coordinate_x = newCoordinate_x;
      coordinate_y = newCoordinate_y;
      numberNearestDot = i;
    }
    if (i == MAX_DOTS_NUMBER - 1) {
      return {x: state.dots[numberNearestDot].x, y: state.dots[numberNearestDot].y}
    }
  }
}

function radiusVisibility(first_obj, second_obj, radius) {
  return (positionRight(first_obj, second_obj, radius) || positionLeft(first_obj, second_obj, radius))
    && (positionDown(first_obj, second_obj, radius) || positionUp(first_obj, second_obj, radius))
}

function positionRight(first_obj, second_obj, radius) {
  if ((first_obj.x - second_obj.x) <= radius && (first_obj.x + second_obj.width / 2 - second_obj.x) > 0)
    return true;

}

function positionLeft(first_obj, second_obj, radius) {
  if ((second_obj.x - first_obj.x) <= radius && (second_obj.x + second_obj.width / 2 - first_obj.x) > 0)
    return true;

}

function positionUp(first_obj, second_obj, radius) {
  if ((second_obj.y - first_obj.y) < radius && (second_obj.y + second_obj.height / 2 - first_obj.y) > 0)
    return true;

}

function positionDown(first_obj, second_obj, radius) {
  if ((first_obj.y - second_obj.y) < radius && (first_obj.y + second_obj.height / 2 - second_obj.y) > 0)
    return true;

}

function enemiesMove() {
  for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
    for (let g in state.players) {
      if (radiusVisibility(state.players[g], state.enemies[j], CONVERGENCE_RADIUS)) {
        move(state.players[g].x, state.players[g].y, state.enemies[j])
      } else {
        move(findNearestDotCoordinate(state.enemies[j]).x, findNearestDotCoordinate(state.enemies[j]).y, state.enemies[j])
      }
    }
  }

}

function checkEaten(socket) {
  for (let i = 0; i < MAX_DOTS_NUMBER; i++) {
    for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
      for (let g in state.players) {
//TODO :: когда бот ест игркока, возникает ошибка в функции еды
        if (canEat(state.players[g], state.dots[i]) || canEat(state.enemies[j], state.dots[i])) {
          state.dots.splice(i, 1);
          initDotsPositions();
          socket.emit("collision dot");
        }

        if (canEat(state.enemies[j], state.players[g])) {
          delete state.players[g];
          console.log(1);
          socket.emit("player_eaten");
        }
        else if (canEat(state.players[g], state.enemies[j])) {
          state.enemies.splice(j, 1);
          console.log(2);
          initEnemiesPositions();
        }

        for (let k in state.players) {
          if (canEat(state.players[k], state.players[g])) {
            delete state.players[g];
            socket.emit("player_eaten");
          }
        }
      }

      for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
        if (canEat(state.enemies[k], state.enemies[j])) {
          state.enemies.splice(j, 1);
          initEnemiesPositions();
        } else if (canEat(state.enemies[j], state.enemies[k])) {
          state.enemies.splice(k, 1);
          initEnemiesPositions();
        }
      }
    }
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
    if (predator.acceleration > LOW_ACCELERATION) {
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
  "enemies": initEnemiesPositions(),
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
      acceleration: PLAYER_ACCELERATION,
    };
    socket.emit("player_created", state.players[socket.id]);
  });

  socket.on('disconnect', function () {
    delete state.players[socket.id];
  });

  socket.on('movement', function (data) {
    let player = state.players[socket.id] || {};
    move(data.x, data.y, player);
    checkEaten(socket);
    enemiesMove();
  });


});
setInterval(function () {
  io.sockets.emit('state', state);
}, 1000 / 60);