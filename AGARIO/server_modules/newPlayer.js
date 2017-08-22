'use strict';
import {rebirth} from './rebirth';

export function newPlayer(socket, state) {
  socket.on('new player', function () {
    rebirth(socket.id, state);
    socket.emit("player_created", state.players[socket.id]);
  });
}
