'use strict';
import {Initializer} from './InitializerPosition';
const initializer = new Initializer();
import {
  KEY_NEW_PLAYER,
  KEY_PLAYERS,
  KEY_PLAYER_CREATED
} from './Config';

export class NewPlayer {
  static create(socket, state) {
    socket.on(KEY_NEW_PLAYER, function (data) {
      const nickname = data;//JSON.parse(data);
      initializer.playersPosition(socket.id, state, nickname);
      socket.emit(KEY_PLAYER_CREATED, JSON.stringify(state[KEY_PLAYERS][socket.id]));
    });
  }
}
