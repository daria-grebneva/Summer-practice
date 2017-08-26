'use strict';
import {Make} from './Rebirth';
import {MAX_ENEMY_NUMBER, ENEMY_SIZE, ENEMY_RADIUS, ENEMY_ACCELERATION} from './Config';

export class EnemiesPositions {
  static init(enemies) {
    for (let i = 0; MAX_ENEMY_NUMBER - enemies.length > 0; i++) {
      enemies.push({
        x: Make.randomCoordinates(0, 1),
        y: Make.randomCoordinates(0, 1),
        color: Make.randomColor(),
        width: ENEMY_SIZE,
        height: ENEMY_SIZE,
        radius: ENEMY_RADIUS,
        acceleration: ENEMY_ACCELERATION,
      })
    }
    return enemies;
  }
}
