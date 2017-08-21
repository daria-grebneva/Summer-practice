import {Field} from "./field";
import {GameObject} from "./object";
import {Dot} from "./dot";
import {Circle} from "./circle";
const PLAYER_SIZE = 10 / 2000;
const PLAYER_RADIUS = 5 / 700;
const PLAYER_COLOR = '#183c3d';

const BACKGROUND_COLOR = '#eeeefe';
const FIELD_COLOR = '#d7f4de';
const FONT_COLOR = '#937cdd';

const PLAYER_ACCELERATION = 0.2;

const CANVAS_SCALE = 50;
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
    public players: void;
    public state = {
        players: null,
        id: 0,
        dots: null,
        dots_length: 0,
        dots_width: 0,
        dots_radius: 0,
        enemies: null,
        enemies_length: 0,
        enemies_width: 0,
        enemies_radius: 0,
        x: 0,
        y: 0,
    };
    public movement = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
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
        socket.emit('new player');
        this.canvas.onclick = (event) => {
            this.start = true;
        };
        socket.on("player_created", () => {
            socket.on('state', (state) => {
                this.state.players = state.players;
                this.state.dots = state.dots;
                this.state.dots_length = state.dots.length;
                for (let i = 0; i < this.state.dots_length; i++) {
                    this.state.dots_width = state.dots[i].width;
                    this.state.dots_radius = state.dots[i].radius;
                }
                this.state.enemies = state.enemies;
                this.state.enemies_length = state.enemies.length;
                for (let i = 0; i < this.state.enemies_length; i++) {
                    this.state.enemies_width = state.enemies[i].width;
                    this.state.enemies_radius = state.enemies[i].radius;
                }
            });
        });
        socket.on("player_eaten", () => {
            //TODO :: сделать заставку для "съеденного" ПРОБЛЕМА: когда игрок съедается, его нет и не действует !this.player
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
        socket.on("collision dot");
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

    _draw() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(X_REVIEW / this.canvas.width, 0, 0, Y_REVIEW / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
        this.field.draw(this.context);
        this._drawEnemies();
        this._drawDots();

    }

    _drawPlayers() {
        this.context.beginPath();
        this.context.fillStyle = this.other_players.color;
        this.context.arc(this.other_players.x * this.canvas.width, this.other_players.y * this.canvas.height, this.movement.radius * this.canvas.width, 0, Math.PI * 2);
        this.context.fill();
    }

    _drawDots() {
        for (let i = 0; i < this.state.dots_length; i++) {
            let dot = this.state.dots[i];
            dot = new Dot(this.context, this.canvas, dot.x, dot.y, dot.width, dot.height, dot.color, dot.radius);
            dot.draw(this.context);
        }
    }

    _drawEnemies() {
        for (let i = 0; i < this.state.enemies_length; i++) {
            let enemy = this.state.enemies[i];
            enemy = new GameObject(this.context, this.canvas, enemy.x, enemy.y, enemy.width, enemy.height, enemy.color, enemy.radius, enemy.acceleration);
            this.context.beginPath();
            this.context.fillStyle = enemy.color;
            this.context.arc(enemy.x * this.canvas.width, enemy.y * this.canvas.height, enemy.radius * this.canvas.width, 0, Math.PI * 2);
            this.context.fill();
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
            this._drawEnemies();
            this._drawPlayers();
        }
        if (!this.start) {
            this._drawWallpaper();
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
