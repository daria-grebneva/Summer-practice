'use strict';
import {Initializer} from './InitializerPosition';
import {
  MAX_FOOD_NUMBER, 
  MAX_ENEMY_NUMBER, 
  LOW_ACCELERATION, 
  MAX_RADIUS, 
  KEY_FOOD, 
  KEY_PLAYERS, 
  KEY_ENEMIES
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
          initializer.playersPosition(g, state, state[KEY_PLAYERS][g]["nickname"]);
        }
        else if (this._canEat(state[KEY_PLAYERS][g], state[KEY_ENEMIES][k])) {
          state[KEY_ENEMIES].splice(k, 1);
          initializer.enemiesPosition(enemies);
        }
      }
      //collision player <-> player
      for (let k in state[KEY_PLAYERS]) {
        if (this._canEat(state[KEY_PLAYERS][k], state[KEY_PLAYERS][g])) {
          initializer.playersPosition(g, state, state[KEY_PLAYERS][g]["nickname"]);
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
    if ((predator.radius > victim.radius) && (this._checkCollision(predator, victim))) {
      return true
    }
  }

  _checkCollision(predator, victim) {
    if ((Math.abs(predator.x + predator.radius - victim.x - victim.radius) < (victim.radius + predator.radius)) &&
      (Math.abs(predator.y + predator.radius - victim.y - victim.radius) < (victim.radius + predator.radius))) {
      if (predator.radius < MAX_RADIUS) {
        predator.radius = Math.hypot(predator.radius, victim.radius);
      }
      if (predator.acceleration > LOW_ACCELERATION) {
        predator.acceleration = predator.acceleration - predator.acceleration * victim.radius;
      }
      return true;
    }
  }
}
