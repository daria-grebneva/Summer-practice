import {Field} from "./field";
import {GameObject} from "./object";
import {Shape} from "./shape";
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

let socket = io();
export interface IGame {
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
    ready: boolean;

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
        this.player = null;
        this.dots = [];
        this._addDot()
        let movement = {
            x: 0,
            y: 0,
            acceleration: 0,
        };
        document.addEventListener("mousemove", (event) => {
            movement.x = (event.offsetX / this.canvas.clientWidth);
            movement.y = (event.offsetY / this.canvas.clientHeight);
        });
        socket.emit('new player');
        socket.on('state', (players) => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.field.draw(this.context);
            this._drawDot();
            for (let id in players) {
                this.player = players[id];
                this.player = new GameObject(this.context, this.canvas, this.player.x, this.player.y, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
                movement.acceleration = PLAYER_ACCELERATION;
                this.player.draw(this.context);
            }
        });
        socket.emit('disconnect');
        setInterval(() => {
            socket.emit('movement', movement);
        }, 1000 / 60);
        window.addEventListener("resize", () => {
            this._resize();
        });
        this._resize(this.canvas);
        requestAnimationFrame(this.onLoop.bind(this));
    }

    _getRandomCoordinates(min, max) {
        return Math.random() * (max - min) + min;
    }

    _getRandomColor() {
        let letters = '0123456789ABCDEF';
        let colorNum = '#';
        for (let i = 0; i < 6; i++) {
            colorNum += letters[Math.floor(Math.random() * 16)];
        }
        return colorNum;
    }

    _addDot() {
        for (let i = 0; MAX_DOTS_NUMBER - this.dots.length > 0; i++) {
            this.dots.push(new Dot(this.context, this.canvas, this._getRandomCoordinates(0, 1), this._getRandomCoordinates(0, 1), SMALL_BALL_SIZE, SMALL_BALL_SIZE, this._getRandomColor(), SMALL_BALL_RADIUS));
        }
    }

    _drawDot() {
        for (let i = 0; i != MAX_DOTS_NUMBER; i++) {
            this.dots[i].draw(this.context);
        }
    }

    _update() {
    }

    _draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.field.draw(this.context);
    }

    onLoop() {
        if (!this.player) {
            this._update();
            this._draw();
        }
        requestAnimationFrame(this.onLoop.bind(this));
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
}

const game = new Game;
