import {Field} from "./Field";
import {Player} from "./Player";
import {Painter} from "./Painter"
import {
    PLAYER_SIZE,
    PLAYER_RADIUS,
    PLAYER_COLOR,
    BACKGROUND_COLOR,
    PLAYER_ACCELERATION,
    KEY_FOOD,
    KEY_PLAYERS,
    KEY_ENEMIES,
    KEY_RADIUS,
    KEY_MOVEMENT,
    KEY_NEW_PLAYER,
    KEY_UPDATE_DATA,
    KEY_PLAYER_CREATED
} from "./Config";

/*declare const require: any;
const io = require('socket.io-client');*/
let socket = io();

class Game {

    private start: boolean;
    private field: Field;
    private player: Player;
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
        y: 0
    };
    private draw: Painter;

    constructor() {

        this.start = false;
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.field = new Field(this.context, this.canvas, 0, 0, 1, 1, BACKGROUND_COLOR);

        this.player = new Player(this.context, this.canvas, this.canvas.width / 2, this.canvas.height / 2, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR, PLAYER_RADIUS, PLAYER_ACCELERATION);

        this.draw = new Painter();
        socket.emit(KEY_NEW_PLAYER);

        this.canvas.onclick = (event) => {
            this.start = true;

        };

        socket.on(KEY_PLAYER_CREATED, () => {
            socket.on(KEY_UPDATE_DATA, (state) => {
                let newState = JSON.parse(state);
                this.state.players = newState[KEY_PLAYERS];
                this.state.food = newState[KEY_FOOD];
                this.state.food_length = 0;
                for (let property in this.state.food) {
                    if (Object.prototype.hasOwnProperty.call(this.state.food, property)) {
                        this.state.food_width = newState[KEY_FOOD][KEY_RADIUS];
                        this.state.food_radius = newState[KEY_FOOD][KEY_RADIUS];
                        this.state.food_length++;
                    }
                }
                this.state.enemies = newState[KEY_ENEMIES];
                this.state.enemies_length = 0;
                for (let property in this.state.enemies) {
                    if (Object.prototype.hasOwnProperty.call(this.state.enemies, property)) {
                        this.state.enemies_width = newState[KEY_ENEMIES][KEY_RADIUS];
                        this.state.enemies_radius = newState[KEY_ENEMIES][KEY_RADIUS];
                        this.state.enemies_length++;
                    }
                }
            });
        });

        socket.emit('disconnect');
        window.addEventListener("resize", () => {
            this._resize();
        });
        this._resize();

       requestAnimationFrame(this.onLoop.bind(this));
       //  setInterval(() => {
       //      this.onLoop();
       //  }, 1000 / 30);
    }

    _update() {
        this._mouseCoordinates();
    }

    _mouseCoordinates() {
        addEventListener("mousemove", (event) => {
            this.movement["x"] = (event.offsetX / this.canvas.clientWidth);
            this.movement["y"] = (event.offsetY / this.canvas.clientHeight);
            socket.emit(KEY_MOVEMENT, JSON.stringify(this.movement));
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
