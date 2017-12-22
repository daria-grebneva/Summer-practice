'use strict';
const MAX_FOOD_NUMBER = 40;
const SMALL_BALL_SIZE = 7 / 2000;
const SMALL_BALL_RADIUS = 2 / 700;
const MAX_RADIUS = 300 / 2000;

const PLAYER_SIZE = 10 / 2000;
const PLAYER_RADIUS = 5 / 700;
const PLAYER_ACCELERATION = 0.09;

const CONVERGENCE_RADIUS = 2 / 25;

const MAX_ENEMY_NUMBER = 0;
const ENEMY_SIZE = 11 / 2000;
const ENEMY_RADIUS = 5 / 700;
const ENEMY_ACCELERATION = 0.01;

const LOW_ACCELERATION = 0.0045;
const FIELD_COLOR = 'rgba(238, 238, 254, 0.8)';
const FONT_COLOR = '#937cdd';
const CANVAS_SCALE = 55;
const RESIZE_COEF = 0.505;
const KEY_MOVEMENT = "m";
const KEY_NEW_PLAYER = "n";
const KEY_UPDATE_DATA = "u";
const KEY_FOOD = "f";
const KEY_PLAYERS = "p";
const KEY_ENEMIES = "e";
const KEY_PLAYER_CREATED = "c";
const KEY_ID = "i";
const KEY_RADIUS = "r";
const KEY_COLOR = "l";
const KEY_ACCELERATION = "a";
const KEY_NICKNAME = "n";
export {
  MAX_FOOD_NUMBER,
  SMALL_BALL_SIZE,
  SMALL_BALL_RADIUS,
  PLAYER_SIZE,
  PLAYER_RADIUS,
  PLAYER_ACCELERATION,
  CONVERGENCE_RADIUS,
  MAX_ENEMY_NUMBER,
  ENEMY_SIZE,
  ENEMY_RADIUS,
  ENEMY_ACCELERATION,
  LOW_ACCELERATION,
  FIELD_COLOR,
  FONT_COLOR,
  CANVAS_SCALE,
  RESIZE_COEF,
  MAX_RADIUS,
  KEY_MOVEMENT,
  KEY_NEW_PLAYER,
  KEY_UPDATE_DATA,
  KEY_FOOD,
  KEY_PLAYERS,
  KEY_ENEMIES,
  KEY_PLAYER_CREATED,
  KEY_ID,
  KEY_RADIUS,
  KEY_COLOR,
  KEY_ACCELERATION,
  KEY_NICKNAME
}