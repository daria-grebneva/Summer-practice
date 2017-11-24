'use strict';
import {MovementController} from './MovementController';
const movementController = new MovementController();
import {KEY_NEW_PLAYER, KEY_PLAYERS} from './Config';

export class NewPlayer {
  static create(socket, state) {
    socket.on(KEY_NEW_PLAYER, function () {
      movementController.playersPositions(socket.id, state);
      socket.emit("player_created", state[KEY_PLAYERS][socket.id]);
    });
  }
}
