'use strict';
import {MovementController} from './MovementController';
const movementController = new MovementController();

export class NewPlayer {
  static create(socket, state) {
    socket.on('new player', function () {
      movementController.playersPositions(socket.id, state);
      socket.emit("player_created", state.players[socket.id]);
    });
  }
}
