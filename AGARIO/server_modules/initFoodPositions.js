'use strict';
import {getRandomColor} from './rebirth';
import {getRandomCoordinates} from './rebirth';
import {MAX_FOOD_NUMBER, SMALL_BALL_SIZE, SMALL_BALL_RADIUS} from './config';

export function initFoodPositions(food) {
  for (let i = 0; MAX_FOOD_NUMBER - food.length > 0; i++) {
    food.push({
      x: getRandomCoordinates(0, 1),
      y: getRandomCoordinates(0, 1),
      color: getRandomColor(),
      width: SMALL_BALL_SIZE,
      height: SMALL_BALL_SIZE,
      radius: SMALL_BALL_RADIUS,
    })
  }
  return food;
}