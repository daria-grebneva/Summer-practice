'use strict';
import {Initializer} from './InitializerPosition';
import {
  MAX_FOOD_NUMBER, 
  MAX_ENEMY_NUMBER, 
  LOW_ACCELERATION, 
  MAX_RADIUS, 
  KEY_FOOD, 
  KEY_PLAYERS, 
  KEY_ENEMIES,
  KEY_RADIUS,
  KEY_ACCELERATION,
  KEY_NICKNAME
} from './Config';

const initializer = new Initializer();

export class CollisionChecker {
  check(state, food, enemies) {
    //ENEMY
    for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
      //collision enemy <-> enemy
      for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
        if (this._canEat(state[KEY_ENEMIES][k], state[KEY_ENEMIES][j])) {
          state[KEY_ENEMIES].splice(j, 1);
          initializer.enemiesPosition(enemies);
        } else if (this._canEat(state[KEY_ENEMIES][j], state[KEY_ENEMIES][k])) {
          state[KEY_ENEMIES].splice(k, 1);
          initializer.enemiesPosition(enemies);
        }
      }
      //collision enemy <-> food
      for (let i = 0; i < MAX_FOOD_NUMBER; i++) {
        if (this._canEat(state[KEY_ENEMIES][j], state[KEY_FOOD][i])) {
          state[KEY_FOOD].splice(i, 1);
          initializer.foodPosition(food);
        }
      }
    }

    //PLAYER
    for (let g in state[KEY_PLAYERS]) {
      //collision player <-> enemy
      for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
        if (this._canEat(state[KEY_ENEMIES][k], state[KEY_PLAYERS][g])) {
          initializer.playersPosition(g, state, state[KEY_PLAYERS][g][KEY_NICKNAME]);
        }
        else if (this._canEat(state[KEY_PLAYERS][g], state[KEY_ENEMIES][k])) {
          state[KEY_ENEMIES].splice(k, 1);
          initializer.enemiesPosition(enemies);
        }
      }
      //collision player <-> player
      for (let k in state[KEY_PLAYERS]) {
        if (this._canEat(state[KEY_PLAYERS][k], state[KEY_PLAYERS][g])) {
          initializer.playersPosition(g, state, state[KEY_PLAYERS][g][KEY_NICKNAME]);
        }
      }
      //collision player <-> food
      for (let i = 0; i < MAX_FOOD_NUMBER; i++) {
        if (this._canEat(state[KEY_PLAYERS][g], state[KEY_FOOD][i])) {
          state[KEY_FOOD].splice(i, 1);
          initializer.foodPosition(food);
        }
      }
    }
  }

  _canEat(predator, victim) {
    if ((predator[KEY_RADIUS] > victim[KEY_RADIUS]) && (this._checkCollision(predator, victim))) {
      return true
    }
  }

  _checkCollision(predator, victim) {
    if ((Math.abs(predator.x + predator[KEY_RADIUS] - victim.x - victim[KEY_RADIUS]) < (victim[KEY_RADIUS] + predator[KEY_RADIUS])) &&
      (Math.abs(predator.y + predator[KEY_RADIUS] - victim.y - victim[KEY_RADIUS]) < (victim[KEY_RADIUS] + predator[KEY_RADIUS]))) {
      if (predator[KEY_RADIUS] < MAX_RADIUS) {
        predator[KEY_RADIUS] = Math.hypot(predator[KEY_RADIUS], victim[KEY_RADIUS]);
      }
      if (predator[KEY_ACCELERATION] > LOW_ACCELERATION) {
        predator[KEY_ACCELERATION] = predator[KEY_ACCELERATION] - predator[KEY_ACCELERATION] * victim[KEY_RADIUS];
      }
      return true;
    }
  }
}
