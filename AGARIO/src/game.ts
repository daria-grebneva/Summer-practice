import {Field} from "./field";
import {GameObject} from "./object";
import {Dot} from "./dot";
import {Circle} from "./circle";

const PLAYER_SIZE = 20 / 2000;
const PLAYER_RADIUS = 10 / 700;
const PLAYER_COLOR = '#183c3d';

const MAX_DOTS_NUMBER = 40;
const MAX_ENEMY_NUMBER = 6;

const SMALL_BALL_SIZE = 8 / 2000;
const SMALL_BALL_RADIUS = 4 / 700;

const BACKGROUND_COLOR = '#eeeefe';

const CONVERGENCE_RADIUS = 5 / 15;

const ENEMY_SIZE = 22 / 2000;
const ENEMY_RADIUS = 12 / 700;

const FIELD_COLOR = '#d7f4de';
const FONT_COLOR = '#937cdd';

const PLAYER_ACCELERATION = 0.09;
const ENEMY_ACCELERATION = 0.01;
const LOW_ACCELERATION = 0.0045;

const CANVAS_SCALE = 40;
let X_REVIEW = 3800;
let Y_REVIEW = 1840;

const RESIZE_COEF = 0.505;


interface IGame {
    canvas: any;
    context: any;
    start: boolean;
    playerWin: boolean;
    numberOfGames: number;
    field: any;
    player: any;
    enemies: Array<GameObject>;
    dots: Array<Circle>;
    playerX: number;
    playerY: number;

}

class Game implements IGame {

    public canvas: any;
    public context: any;
    public start: boolean;
    public playerWin: boolean;
    public numberOfGames: number;
    public field: Field;
    public player: any;
    public enemies: Array<GameObject>;
    public dots: Array<Circle>;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public playerX: number;
    public playerY: number;

    constructor() {

        this.start = false;
        this.playerWin = true;
        this.numberOfGames = 0;
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.field = new Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
        this.player = new GameObject(this.context, this.canvas, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
        this.player.x = this.field.width / 2;
        this.player.y = this.field.height / 2;


        this.enemies = [];
        this.dots = [];
        this._addDot();
        this._addEnemy();
        this.canvas.onclick = (event) => {
            this._startGame();
        };
        this.canvas.addEventListener("mousemove", (event) => {
            this.playerX = event.offsetX / this.canvas.clientWidth;
            this.playerY = event.offsetY / this.canvas.clientHeight;
        });
        window.addEventListener("resize", () => {
            this._resize();
        });
        this._resize(this.canvas);
        requestAnimationFrame(this.onLoop.bind(this));
    }

    _getRandomCoordinates(min, max) {
        return Math.random() * (max - min) + min;
    }

    _drawDot() {
        for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
            this.dots[i].draw(this.context);
        }
    }

    _addDot() {
        for (let i = 0; MAX_DOTS_NUMBER - this.dots.length > 0; i++) {
            this.dots.push(new Dot(this.context, this.canvas, this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, this._getRandomColor(), SMALL_BALL_RADIUS));
        }
    }

    _addEnemy() {
        for (let i = 0; MAX_DOTS_NUMBER - this.enemies.length > 0; i++) {
            this.enemies.push(new GameObject(this.context, this.canvas, this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), ENEMY_SIZE, ENEMY_SIZE, this._getRandomColor(), ENEMY_RADIUS, ENEMY_ACCELERATION));
        }
    }

    _drawEnemies() {
        for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
            this.enemies[j].draw(this.context);
        }
    }

    _getRandomColor() {
        let letters = '0123456789ABCDEF';
        let colorNum = '#';
        for (let i = 0; i < 6; i++) {
            colorNum += letters[Math.floor(Math.random() * 16)];
        }
        return colorNum;
    }

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _resize() {
        let canvas = this.canvas;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            X_REVIEW = width / RESIZE_COEF;
            Y_REVIEW = height / RESIZE_COEF;
            return true;
        }
        return false;
    }


    _enemiesMove() {
        if (this.start) {
            for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
                let i = this._getRandomInt(0, this.dots.length);
                if (this._radiusVisibility(this.player, this.enemies[j], CONVERGENCE_RADIUS)) {
                    this.enemies[j].move(this.player.x, this.player.y);
                }
                else {
                    for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
                        this.enemies[j].move(this._findNearestDotCoordinate(this.enemies[j]).x, this._findNearestDotCoordinate(this.enemies[j]).y);
                    }
                }
            }
        }
    }

    _processCollisions() {
        //Съедание врагов и игрока
        for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
            if (this._canEat(this.enemies[j], this.player) == true) {
                this._endGame();
            }
            else if (this._canEat(this.player, this.enemies[j]) == true) {
                this.enemies.splice(j, 1);
                this.numberEatenEnemies++;
                this._addEnemy();
            }
            else for (let k = 0; k != MAX_ENEMY_NUMBER; k++) {
                    if (this._canEat(this.enemies[k], this.enemies[j]) == true) {
                        this.enemies.splice(j, 1);
                        this._addEnemy();
                    } else if (this._canEat(this.enemies[j], this.enemies[k]) == true) {
                        this.enemies.splice(k, 1);
                        this._addEnemy();
                    }
                }
        }

        //Съедание точки
        for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
            for (let j = 0; j != MAX_DOTS_NUMBER; j++) {
                if (this._canEat(this.player, this.dots[i]) == true || this._canEat(this.enemies[j], this.dots[i]) == true) {
                    this.dots.splice(i, 1);
                    this._addDot();
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
            if (predator.acceleration < LOW_ACCELERATION) {
                predator.acceleration = predator.acceleration - predator.acceleration * victim.width;
            }
            return true;
        }
    }

    _findNearestDotCoordinate(enemy) {
        let coordinate_x = 1;
        let coordinate_y = 1;
        let newCoordinate_x = 0;
        let newCoordinate_y = 0;
        let numberNearestDot = 0;
        for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
            newCoordinate_x = Math.abs(enemy.x - this.dots[i].x);
            newCoordinate_y = Math.abs(enemy.y - this.dots[i].y);
            if ((newCoordinate_x < coordinate_x) && (newCoordinate_y < coordinate_y)) {
                coordinate_x = newCoordinate_x;
                coordinate_y = newCoordinate_y;
                numberNearestDot = i;
            }
            if (i == MAX_DOTS_NUMBER - 1) {
                return {x: this.dots[numberNearestDot].x, y: this.dots[numberNearestDot].y}
            }
        }
    }

    _radiusVisibility(first_obj, second_obj, radius) {
        return (this._positionRight(first_obj, second_obj, radius) || this._positionLeft(first_obj, second_obj, radius))
            && (this._positionDown(first_obj, second_obj, radius) || this._positionUp(first_obj, second_obj, radius))
    }

    _positionRight(first_obj, second_obj, radius) {
        if ((first_obj.x - second_obj.x) <= radius && (first_obj.x + second_obj.width / 2 - second_obj.x) > 0)
            return true;

    }

    _positionLeft(first_obj, second_obj, radius) {
        if ((second_obj.x - first_obj.x) <= radius && (second_obj.x + second_obj.width / 2 - first_obj.x) > 0)
            return true;

    }

    _positionUp(first_obj, second_obj, radius) {
        if ((second_obj.y - first_obj.y) < radius && (second_obj.y + second_obj.height / 2 - first_obj.y) > 0)
            return true;

    }

    _positionDown(first_obj, second_obj, radius) {
        if ((first_obj.y - second_obj.y) < radius && (first_obj.y + second_obj.height / 2 - second_obj.y) > 0)
            return true;

    }

    _startGame() {
        if (!this.start) {
            this.start = true;
        }
    }

    _endGame() {
        this.start = false;
        this.numberOfGames++;
        this._restart();
    }

    _restart() {
        delete this.player;
        this.player = new GameObject(this.context, this.canvas, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
        this.player.x = this.field.width / 2;
        this.player.y = this.field.height / 2;
        this.enemies = [];
        this.dots = [];
        this._addDot();
        this._addEnemy();
    }

    _drawWallpaper() {
        this.context.fillStyle = FIELD_COLOR;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
        this.context.fillStyle = FONT_COLOR;
        this.context.font = this.canvas.height * 1 / 7 + 'px slabo';
        this.context.fillText('AGARIO', this.canvas.width * 3 / 10, this.canvas.height * 4 / 10);
        this.context.font = this.canvas.height * 1 / 9 + 'px slabo';
        this.context.fillText('Click to continue', this.canvas.width * 3 / 10, this.canvas.height * 5 / 10);
        if (this.numberOfGames > 0) {
            this.context.font = this.canvas.height * 1 / 9 + 'px slabo';
            this.context.fillText('You ate', this.canvas.width * 3 / 10, this.canvas.height * 6 / 10);
        }
    }

    _gameCameraCoordinates() {
        let cameraX = Math.round((this.canvas.width / CANVAS_SCALE - this.player._x - this.player._width / 2));
        let cameraY = Math.round((this.canvas.height / CANVAS_SCALE - this.player._y - this.player._height / 2));
        return {x: cameraX, y: cameraY}
    }

    _update() {
        this.player.move(this.playerX, this.playerY);
        this._enemiesMove();
        this._processCollisions();
    }

    _draw() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(X_REVIEW / this.canvas.width, 0, 0, Y_REVIEW / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
        this.field.draw(this.context);
        this._drawDot();
        this._drawEnemies();
        this.player.draw(this.context);
        if (!this.start) {
            this._drawWallpaper();
        }
    }

    onLoop() {
        this._update();
        this._draw();
        requestAnimationFrame(this.onLoop.bind(this));
    }
}

const
    game = new Game();
