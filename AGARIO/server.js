const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'agario.html'));
});

server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

let players = {};
let dots = {};
io.on('connection', function (socket) {
  function getRandomCoordinates(min, max) {
    return Math.random() * (max - min) + min;
  }

    socket.on('new player', function () {
   players[socket.id] = {
   x: getRandomCoordinates(0, 1),
   y: getRandomCoordinates(0, 1)
   };
   });
/*  socket.on('scene', function () {
      dots[socket.i] = {
        x: getRandomCoordinates(0, 1),
        y: getRandomCoordinates(0, 1),
      };
      console.log(dots[socket.i] )

  });*/

   socket.on('disconnect', function () {
   let player = players[socket.id] || {};
   delete players[socket.id];
   });
   function move(coordX, coordY, acceleration, obj) {
   let xDistance = coordX - obj.x;
   let yDistance = coordY - obj.y;
   let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
   if (distance > 0) {
   obj.x += xDistance * acceleration;
   obj.y += yDistance * acceleration;
   }
   }

   socket.on('movement', function (data) {
   let player = players[socket.id] || {};
   move(data.x, data.y, data.acceleration, player);
   });
});
setInterval(function () {
  io.sockets.emit('state', players);
  //io.sockets.emit('state', dots);
}, 1000 / 60);