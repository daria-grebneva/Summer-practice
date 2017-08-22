'use strict';
import {PLAYER_SIZE, PLAYER_RADIUS, PLAYER_ACCELERATION} from './config';

export function rebirth(id, state) {
  state.players[id] = {
    x: getRandomCoordinates(0, 1),
    y: getRandomCoordinates(0, 1),
    radius: PLAYER_RADIUS,
    color: getRandomColor(),
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    acceleration: PLAYER_ACCELERATION,
  };
}

export function getRandomCoordinates(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let colorNum = '#';
  for (let i = 0; i < 6; i++) {
    colorNum += letters[Math.floor(Math.random() * 16)];
  }
  return colorNum;
}
