'use strict';
import {rebirth} from './rebirth';
import {initFoodPositions} from './initFoodPositions';
import {initEnemiesPositions} from './initEnemiesPositions';
import {MAX_FOOD_NUMBER, MAX_ENEMY_NUMBER, LOW_ACCELERATION} from './config';

export function checkEaten(socket, state, food, enemies) {
  for (let i = 0; i < MAX_FOOD_NUMBER; i++) {
    for (let j = 0; j < MAX_ENEMY_NUMBER; j++) {
      for (let g in state.players) {
        if (canEat(state.players[g], state.food[i]) || canEat(state.enemies[j], state.food[i])) {
          state.food.splice(i, 1);
          initFoodPositions(food);
        }
        if (canEat(state.enemies[j], state.players[g])) {
          rebirth(g, state);
        }
        else if (canEat(state.players[g], state.enemies[j])) {
          state.enemies.splice(j, 1);
          initEnemiesPositions(enemies);
        }
        for (let k in state.players) {
          if (canEat(state.players[k], state.players[g])) {
            rebirth(g, state);
          }
        }
      }
      for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
        if (canEat(state.enemies[k], state.enemies[j])) {
          state.enemies.splice(j, 1);
          initEnemiesPositions(enemies);
        } else if (canEat(state.enemies[j], state.enemies[k])) {
          state.enemies.splice(k, 1);
          initEnemiesPositions(enemies);
        }
      }
    }
  }
}

function checkCollision(predator, victim) {
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

function canEat(predator, victim) {
  if ((predator.width > victim.width) && (checkCollision(predator, victim) == true)) {
    return true
  }
}

