'use strict';
import {getRandomColor} from './rebirth';
import {getRandomCoordinates} from './rebirth';
import {MAX_ENEMY_NUMBER, ENEMY_SIZE, ENEMY_RADIUS, ENEMY_ACCELERATION} from './config';

export function initEnemiesPositions(enemies) {
  for (let i = 0; MAX_ENEMY_NUMBER - enemies.length > 0; i++) {
    enemies.push({
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1),
      color: getRandomColor(),
      width: ENEMY_SIZE,
      height: ENEMY_SIZE,
      radius: ENEMY_RADIUS,
      acceleration: ENEMY_ACCELERATION,
    })
  }
  return enemies;
}