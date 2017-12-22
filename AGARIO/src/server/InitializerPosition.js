'use strict';

import {
  MAX_ENEMY_NUMBER,
  MAX_FOOD_NUMBER,
  SMALL_BALL_RADIUS,
  ENEMY_RADIUS,
  ENEMY_ACCELERATION,
  PLAYER_RADIUS,
  PLAYER_ACCELERATION,
  KEY_PLAYERS,
  KEY_ID,
  KEY_RADIUS,
  KEY_COLOR,
  KEY_ACCELERATION,
  KEY_NICKNAME
} from './Config';
import {Utils} from './Utils';

export class Initializer {
  foodPosition(food) {
    for (let i = 0; MAX_FOOD_NUMBER - food.length > 0; i++) {
      food.push({
        "x": Utils.randomCoordinates(0, 1),
        "y": Utils.randomCoordinates(0, 1),
        "l": Utils.randomColor(),
        "r": SMALL_BALL_RADIUS,
      })
    }
    return food;
  }

  enemiesPosition(enemies) {
    for (let i = 0; MAX_ENEMY_NUMBER - enemies.length >= 1; i++) {
      enemies.push({
        "x": Utils.randomCoordinates(0, 1),
        "y": Utils.randomCoordinates(0, 1),
        "l": Utils.randomColor(),
        "r": ENEMY_RADIUS,
        "a": ENEMY_ACCELERATION,
      })
    }
    return enemies;
  }

  playersPosition(id, state, nickname) {
    state[KEY_PLAYERS][id] = {
      "i": id,
      "x": Utils.randomCoordinates(0, 1),
      "y": Utils.randomCoordinates(0, 1),
      "r": PLAYER_RADIUS,
      "l": Utils.randomColor(),
      "a": PLAYER_ACCELERATION,
      "n": nickname
    };
  }
}
