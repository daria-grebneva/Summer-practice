import {Field} from "./field";
import {GameObject} from "./object";
import {Dot} from "./dot";
import {Circle} from "./circle";
const PLAYER_SIZE = 10 / 2000;
const PLAYER_RADIUS = 5 / 700;
const PLAYER_COLOR = '#183c3d';


const MAX_ENEMY_NUMBER = 6;

//const SMALL_BALL_SIZE = 8 / 2000;
const SMALL_BALL_RADIUS = 4 / 700;

const BACKGROUND_COLOR = '#eeeefe';

const CONVERGENCE_RADIUS = 5 / 15;

const ENEMY_SIZE = 22 / 2000;
const ENEMY_RADIUS = 12 / 700;

const FIELD_COLOR = '#d7f4de';
const FONT_COLOR = '#937cdd';

const PLAYER_ACCELERATION = 0.2;
const ENEMY_ACCELERATION = 0.01;
const LOW_ACCELERATION = 0.0045;

const CANVAS_SCALE = 50;//40;
let X_REVIEW = 3800;//3800;
let Y_REVIEW = 1840;//1840;

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

}


class Game implements IGame {

    public canvas: any;
    public context: any;
    public start: boolean;
    public playerWin: boolean;
    public numberOfGames: number;
    public field: Field;
    public player: any;
    public other_players: any;
    public enemies: Array<GameObject>;
    public dots: Array<Circle>;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public playerX: number;
    public playerY: number;
    public players: void;
    public state = {
        players: null,
        id: 0,
        dots: null,
        dots_length: 0,
        x: 0,
        y: 0,
    };
    public movement = {
        x: 0,
        y: 0,
        acceleration: 0,
        width: 0,
        height: 0,
        radius: 0,
    };

    public collision = {
        predator: 0,
        victim: 0,
        acceleration: 0,
    };


    constructor() {

        this.start = false;
        this.playerWin = true;
        this.numberOfGames = 0;
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.field = new Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);
        this.dots = [];

        this.player = new GameObject(this.context, this.canvas, this.canvas.width / 2, this.canvas.height / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);
        this.movement.acceleration = this.player.acceleration;

        socket.emit('new player');
        socket.on("player_created", () => {
            socket.on('state', (state) => {
                this.state.players = state.players;
                this.state.dots = state.dots;
                this.state.dots_length = state.dots.length;
               /* this.state.x = state.x;
                this.state.y = state.y;*/
            });
        });

        socket.emit('disconnect');
        window.addEventListener("resize", () => {
            this._resize();
        });
        this._resize(this.canvas);
        requestAnimationFrame(this.onLoop.bind(this));
    }

    _update() {
        socket.emit('movement', this.movement);
        socket.on("collision dot", () => {

  /*          this.player.width = this.player.width + 0.001;
            this.player.height = this.player.height + 0.001;
            this.movement.radius = this.movement.radius + 0.001;*/
            console.log(this.movement.radius);
        })
    }


    _draw() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(X_REVIEW / this.canvas.width, 0, 0, Y_REVIEW / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
        this.field.draw(this.context);
        this._drawDots();
    }

    _drawPlayers() {
        this.context.beginPath();
        this.context.fillStyle = this.player.color;
        this.context.arc(this.other_players.x * this.canvas.width, this.other_players.y * this.canvas.height, this.other_players.radius * this.canvas.width, 0, Math.PI * 2);
        this.context.fill();
    }

    _drawDots() {
        for (let i = 0; i < this.state.dots_length; i++) {
            let dot = this.state.dots[i];
            dot = new Dot(this.context, this.canvas, dot.x, dot.y, dot.width, dot.height, dot.color, SMALL_BALL_RADIUS);
            dot.draw(this.context);
        }
    }

    _gameCameraCoordinates() {
        let cameraX = Math.round((this.canvas.width / CANVAS_SCALE - this.movement.x * this.canvas.width - this.player._width / 2));
        let cameraY = Math.round((this.canvas.height / CANVAS_SCALE - this.movement.y * this.canvas.height - this.player._height / 2));
        return {x: cameraX, y: cameraY}
    }

    _mouseCoordinates() {
        addEventListener("mousemove", (event) => {
            this.movement.x = (event.offsetX / this.canvas.clientWidth);
            this.movement.y = (event.offsetY / this.canvas.clientHeight);
        });
    }

    onLoop() {
        this._mouseCoordinates();
        this._draw();
        for (let id in this.state.players) {
            this.other_players = this.state.players[id];
           this.movement.width = this.other_players.width;
            this.movement.height = this.other_players.height;
            this.movement.radius = this.other_players.radius;
            this._update();
            this._drawPlayers();
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
