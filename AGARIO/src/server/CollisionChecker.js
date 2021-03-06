'use strict';
import {MovementController} from './MovementController';
import {MAX_FOOD_NUMBER, MAX_ENEMY_NUMBER, LOW_ACCELERATION} from './Config';

const movementController = new MovementController();

export class CollisionChecker {
    check(socket, state, food, enemies) {
    for (let i = 0; i < MAX_FOOD_NUMBER; i++) {
      for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
        for (let g in state.players) {
          if (this._canEat(state.players[g], state.food[i]) || this._canEat(state.enemies[j], state.food[i])) {
            state.food.splice(i, 1);
            movementController.foodPositions(food);
          }
          if (this._canEat(state.enemies[j], state.players[g])) {
            movementController.playersPositions(g, state);
          }
          else if (this._canEat(state.players[g], state.enemies[j])) {
            state.enemies.splice(j, 1);
            movementController.enemiesPositions(enemies);
          }
          for (let k in state.players) {
            if (this._canEat(state.players[k], state.players[g])) {
              movementController.playersPositions(g, state);
            }
          }
        }
        for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
          if (this._canEat(state.enemies[k], state.enemies[j])) {
            state.enemies.splice(j, 1);
            movementController.enemiesPositions(enemies);
          } else if (this._canEat(state.enemies[j], state.enemies[k])) {
            state.enemies.splice(k, 1);
            movementController.enemiesPositions(enemies);
          }
        }
      }
    }
  }

  _canEat(predator, victim) {
    if ((predator.width > victim.width) && (this._checkCollision(predator, victim) == true)) {
      return true
    }
  }

  _checkCollision(predator, victim) {
    if (((predator.x - predator.width / 2 - victim.width / 2) < victim.x
      && victim.x < (predator.x + predator.width / 2 + victim.width / 2))
      && ((predator.y - predator.height - victim.height) < victim.y
      && victim.y < (predator.y + predator.height + victim.height) )) {
      predator.width = predator.width + victim.width * victim.width;
      predator.height = predator.height + victim.height * victim.width;
      predator.radius = predator.radius + victim.radius * victim.width;
      if (predator.acceleration > LOW_ACCELERATION) {
        predator.acceleration = predator.acceleration - predator.acceleration * victim.width;
      }
      return true;
    }
  }
}
