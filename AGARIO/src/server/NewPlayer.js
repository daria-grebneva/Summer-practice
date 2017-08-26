'use strict';
import {Make} from './Rebirth';

export class Player {
  static new(socket, state) {
    socket.on('new player', function () {
      Make.rebirth(socket.id, state);
      socket.emit("player_created", state.players[socket.id]);
    });
  }
}
