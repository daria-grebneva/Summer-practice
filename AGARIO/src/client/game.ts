import {Field} from "./Field";
import {Player} from "./Player";
import {Painter} from "./Painter"
import {PLAYER_SIZE, PLAYER_RADIUS, PLAYER_COLOR, BACKGROUND_COLOR, PLAYER_ACCELERATION} from "./Config";

//let io = require('socket.io');
let socket = io();

class Game {

    private start: boolean;
    private field: Field;
    private player: Player;
    private other_players: Player;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private state = {
        players: null,
        food: null,
        food_length: 0,
        food_width: 0,
        food_radius: 0,
        enemies: null,
        enemies_length: 0,
        enemies_width: 0,
        enemies_radius: 0,
    };
    private movement = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
    };
    private draw: Painter;

    constructor() {

        this.start = false;
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.field = new Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);

        this.player = new Player(this.context, this.canvas, this.canvas.width / 2, this.canvas.height / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);

        this.draw = new Painter();
        socket.emit('new player');

        this.canvas.onclick = (event) => {
            this.start = true;

        };

        socket.on("player_created", () => {
            socket.on('state', (state) => {
                this.state.players = state.players;
                this.state.food = state.food;
                this.state.food_length = state.food.length;
                for (let i = 0; i < this.state.food_length; i++) {
                    this.state.food_width = state.food[i].width;
                    this.state.food_radius = state.food[i].radius;
                }
                this.state.enemies = state.enemies;
                this.state.enemies_length = state.enemies.length;
                for (let i = 0; i < this.state.enemies_length; i++) {
                    this.state.enemies_width = state.enemies[i].width;
                    this.state.enemies_radius = state.enemies[i].radius;
                }
            });
        });

        socket.emit('disconnect');
        window.addEventListener("resize", () => {
            this._resize();
        });
        this._resize();

        requestAnimationFrame(this.onLoop.bind(this));
    }

    _update() {
        socket.emit('movement', this.movement);
        this._mouseCoordinates();
    }

    _mouseCoordinates() {
        addEventListener("mousemove", (event) => {
            this.movement.x = (event.offsetX / this.canvas.clientWidth);
            this.movement.y = (event.offsetY / this.canvas.clientHeight);
        });
    }


    onLoop() {
        this._update();
        this.draw.paint(this.context, this.canvas, this.state.players, this.movement, this.player, this.field, this.start, this.state.food_length, this.state.enemies_length, this.state.food, this.state.enemies);
        requestAnimationFrame(this.onLoop.bind(this));
    }

    _resize() {
        let canvas = this.canvas;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }
}

const game = new Game;
