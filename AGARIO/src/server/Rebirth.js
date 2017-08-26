'use strict';
import {PLAYER_SIZE, PLAYER_RADIUS, PLAYER_ACCELERATION} from './Config';

export class Make{
  static rebirth(id, state) {
    state.players[id] = {
      x: this.randomCoordinates(0, 1),
      y: this.randomCoordinates(0, 1),
      radius: PLAYER_RADIUS,
      color: this.randomColor(),
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      acceleration: PLAYER_ACCELERATION,
    };
  }

  static randomCoordinates(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomColor() {
    let letters = '0123456789ABCDEF';
    let colorNum = '#';
    for (let i = 0; i < 6; i++) {
      colorNum += letters[Math.floor(Math.random() * 16)];
    }
    return colorNum;
  }
}
