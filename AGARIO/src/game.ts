import {Field} from "./field";
import {GameObject} from "./object";
import {Dot} from "./dot";

const PLAYER_SIZE = 50 / 2000;
const PLAYER_RADIUS = 25 / 700;
const PLAYER_COLOR = '#183c3d';

const MAX_DOTS_NUMBER = 5;
const MAX_ENEMY_NUMBER = 2;

const SMALL_BALL_SIZE = 20 / 2000;
const SMALL_BALL_RADIUS = 10 / 700;

const BACKGROUND_COLOR = '#ffffff';

const CONVERGENCE_RADIUS = 1 / 15;

const ENEMY_SIZE = 55 / 2000;
const ENEMY_RADIUS = 30 / 700;

const FIELD_COLOR = '#d7f4de';
const FONT_COLOR = '#937cdd';

const PLAYER_ACCELERATION = 0.09;
const ENEMY_ACCELERATION = 0.01;

interface IGame {
    canvas: any;
    context: any;
    start: boolean;
    playerWin: boolean;
    numberOfGames: number;
    field: any;
    player: any;
    enemies: Array<any>;
    dots: Array<any>;

}

class Game implements IGame {

    public canvas: any;
    public context: any;
    public start: boolean;
    public playerWin: boolean;
    public numberOfGames: number;
    public field: any;
    public player: any;
    public enemies: Array<any>;
    public dots: Array<any>;


    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.start = false;
        this.playerWin = true;
        this.numberOfGames = 0;
        this.field = new Field(this.canvas, 0, 0, 1, 1, "red");
        this.player = new GameObject(this.canvas, PLAYER_COLOR, 1 / 2, 1 / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_RADIUS, PLAYER_ACCELERATION);
        this.player.x = this.field.width / 2;
        this.player.y = this.field.height / 2;

        this.enemies = [];
        this.dots = [];
        this._addDot();
        this._addEnemy();

        this.canvas.onclick = (event) => {
            this._startGame();
         //   console.log('start');
        };
        this.canvas.addEventListener("mousemove", (event) => {
            this.player.move(event.offsetX / this.canvas.clientWidth, event.offsetY / this.canvas.clientHeight);
          //  console.log('player moving');
        });
        window.addEventListener("resize", () => {
            this._resize();
          //  console.log('resizeN');
        });
        this._resize();
        requestAnimationFrame(this.onLoop.bind(this));
    }

    _getRandomCoordinates(min, max) {
     //   console.log('getRandomCoordinates');
        return Math.random() * (max - min) + min;
    }

    _drawDot() {
        for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
           // console.log('drawDot');
            this.dots[i].draw();
        }
    }

    _addDot() {
        for (let i = 0; MAX_DOTS_NUMBER - this.dots.length > 0; i++) {
         //   console.log('addDot');
            this.dots.push(new Dot(this.canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, SMALL_BALL_RADIUS));
        }
    }

    _addEnemy() {
        for (let i = 0; MAX_DOTS_NUMBER - this.enemies.length > 0; i++) {
            this.enemies.push(new GameObject(this.canvas, this._getRandomColor(), this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), ENEMY_SIZE, ENEMY_SIZE, ENEMY_RADIUS, ENEMY_ACCELERATION));
        }
    }

    _drawEnemies() {
        for (let j = 0; j != MAX_ENEMY_NUMBER; j++) {
            this.enemies[j].draw();
        //    console.log('enemy draw');
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
        const width = canvas.scrollWidth;
        const height = canvas.scrollHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }


    _enemiesMove() {
        if (this.start) {
            console.log('enemy moving');
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
            predator.acceleration = predator.acceleration - predator.acceleration * victim.width;
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
    }

    _drawWallpaper() {
        this.context.fillStyle = FIELD_COLOR;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
        this.context.fillStyle = FONT_COLOR;
        this.context.font = this.canvas.height * 1 / 7 + 'px slabo';
        this.context.fillText('AGARIO', this.canvas.width * 1 / 10, this.canvas.height * 2 / 10);
        this.context.font = this.canvas.height * 1 / 9 + 'px slabo';
        this.context.fillText('Click to continue', this.canvas.width * 1 / 10, this.canvas.height * 3 / 10);
        if (this.numberOfGames > 0) {
            this.context.font = this.canvas.height * 1 / 9 + 'px slabo';
            this.context.fillText('You ate', this.canvas.width * 1 / 10, this.canvas.height * 4 / 10);
        }
    }

    _update() {
        this._enemiesMove();
        this._processCollisions();
    }

    _draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.field.draw(this.canvas.width, this.canvas.height);
        this._drawDot();
        this._drawEnemies();
        this.player.draw();
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