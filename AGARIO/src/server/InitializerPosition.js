'use strict';

import {
  MAX_ENEMY_NUMBER,
  MAX_FOOD_NUMBER,
  SMALL_BALL_RADIUS,
  ENEMY_RADIUS,
  ENEMY_ACCELERATION,
  PLAYER_RADIUS,
  PLAYER_ACCELERATION,
  KEY_PLAYERS
} from './Config';
import {Utils} from './Utils';

export class Initializer {
  foodPosition(food) {
    for (let i = 0; MAX_FOOD_NUMBER - food.length > 0; i++) {
      food.push({
        x: Utils.randomCoordinates(0, 1),
        y: Utils.randomCoordinates(0, 1),
        color: Utils.randomColor(),
        radius: SMALL_BALL_RADIUS,
      })
    }
    return food;
  }

  enemiesPosition(enemies) {
    for (let i = 0; MAX_ENEMY_NUMBER - enemies.length >= 1; i++) {
      enemies.push({
        x: Utils.randomCoordinates(0, 1),
        y: Utils.randomCoordinates(0, 1),
        color: Utils.randomColor(),
        radius: ENEMY_RADIUS,
        acceleration: ENEMY_ACCELERATION,
      })
    }
    return enemies;
  }

  playersPosition(id, state, nickname) {
    state[KEY_PLAYERS][id] = {
      id_player: id,
      x: Utils.randomCoordinates(0, 1),
      y: Utils.randomCoordinates(0, 1),
      radius: PLAYER_RADIUS,
      color: Utils.randomColor(),
      acceleration: PLAYER_ACCELERATION,
      nickname: nickname
    };
  }
}
