// Dependencies.
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
 app.get('/', function(request, response) {
 response.sendFile(path.join(__dirname, 'agario.html'));
 });

 server.listen(5000, function() {
 console.log('Starting server on port 5000');
 });

 const players = [];
 const dots = [];
 io.on('connection', function(socket) {
 socket.on('new player', function() {
 players[socket.id] = {
 x: 300,
 y: 300
 };
 });
 socket.on('movement', function(data) {
 let player = players[socket.id] || {};
 player = data;
 });
 socket.emit('state', players);
 socket.emit('state', dots);
 });

