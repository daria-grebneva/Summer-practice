'use strict';
import {Make} from './Rebirth';
import {MAX_FOOD_NUMBER, SMALL_BALL_SIZE, SMALL_BALL_RADIUS} from './Config';

export class FoodPositions {
  static init(food) {
    for (let i = 0; MAX_FOOD_NUMBER - food.length > 0; i++) {
      food.push({
        x: Make.randomCoordinates(0, 1),
        y: Make.randomCoordinates(0, 1),
        color: Make.randomColor(),
        width: SMALL_BALL_SIZE,
        height: SMALL_BALL_SIZE,
        radius: SMALL_BALL_RADIUS,
      })
    }
    return food;
  }
}
