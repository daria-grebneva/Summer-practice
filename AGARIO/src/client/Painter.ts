import {Player} from "./Player";
import {Food} from "./Food";
import {Field} from "./Field";
import {FIELD_COLOR, FONT_COLOR, CANVAS_SCALE, RESIZE_COEF, KEY_RADIUS, KEY_COLOR} from "./Config";

export class Painter {
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
    private player: Player;
    private field: Field;
    private other_players: Player;
    private start: boolean;

    paint(context, canvas, statePlayers, movement, player, field, start, food_length, enemies_length, food, enemies) {
        this.context = context;
        this.canvas = canvas;
        this.state.players = statePlayers;
        this.state.food_length = food_length;
        this.state.enemies_length = enemies_length;
        this.state.food = food;
        this.state.enemies = enemies;

        this.movement = movement;
        this.player = player;
        this.field = field;
        this.start = start;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let xReview = this.canvas.width / RESIZE_COEF;
        let yReview = this.canvas.height / RESIZE_COEF;
        this.context.setTransform(xReview / this.canvas.width, 0, 0, yReview / this.canvas.height, this._gameCameraCoordinates().x, this._gameCameraCoordinates().y);
        this.field.draw(this.context);
        if (this.start) {
            this._drawFood();
            this._drawPlayers();
            this._drawEnemies();
        } else {
            this._drawWallpaper();
        }
    }

    _drawWallpaper() {
        this.context.fillStyle = FIELD_COLOR;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
        this.context.fillStyle = FONT_COLOR;
        this.context.font = this.canvas.height * 1 / 7 + 'px lobster';
        this.context.fillText('AGARIO', this.canvas.width * 3 / 10, this.canvas.height * 4 / 10);
        this.context.font = this.canvas.height * 1 / 9 + 'px lobster';
        this.context.fillText('Click to start', this.canvas.width * 3 / 10, this.canvas.height * 5 / 10);
    }

    _drawPlayers() {
        for (let id in this.state.players) {
            this.other_players = this.state.players[id];
            this.movement.width = this.other_players[KEY_RADIUS];
            this.movement.height = this.other_players[KEY_RADIUS];
            this.movement.radius = this.other_players[KEY_RADIUS];
            this.context.beginPath();
            this.context.fillStyle = this.other_players[KEY_COLOR];
            this.context.arc(this.other_players['x'] * this.canvas.width, this.other_players['y'] * this.canvas.height, this.movement.radius * this.canvas.width, 0, Math.PI * 2);
            this.context.fill();
            this.context.fillStyle = 'black';
            this.context.font = this.other_players[KEY_RADIUS] * this.canvas.width / 1.5 + 'px lobster';
            let width = Math.round(this.other_players[KEY_RADIUS] * 10000) / 100;
            this.context.fillText(String(width), (this.other_players['x'] - this.other_players[KEY_RADIUS] / 2) * this.canvas.width, (this.other_players['y'] + this.other_players[KEY_RADIUS] / 2) * this.canvas.height);
        }
    }

    _drawFood() {
        for (let i = 0; i < this.state.food_length; i++) {
            let food = this.state.food[i];
            food = new Food(this.context, this.canvas, food['x'], food['y'], food[KEY_RADIUS], food[KEY_RADIUS], food[KEY_COLOR], food[KEY_RADIUS]);
            food.draw(this.context);
        }
    }

    _drawEnemies() {
        for (let i = 0; i < this.state.enemies_length; i++) {
            let enemy = this.state.enemies[i];
            enemy = new Player(this.context, this.canvas, enemy['x'], enemy['y'], enemy[KEY_RADIUS], enemy[KEY_RADIUS], enemy[KEY_COLOR], enemy.radius, enemy.acceleration);
            this.context.beginPath();
            this.context.fillStyle = enemy.color;
            this.context.arc(enemy['x'] * this.canvas.width, enemy['y'] * this.canvas.height, enemy.radius * this.canvas.width, 0, Math.PI * 2);
            this.context.fill();
            this.context.fillStyle = 'black';
            this.context.font = enemy[KEY_RADIUS] * this.canvas.width / 1.5 + 'px lobster';
            let width = Math.round(enemy[KEY_RADIUS] * 10000) / 100;
            this.context.fillText(String(width), (enemy['x'] - enemy[KEY_RADIUS] / 2) * this.canvas.width, (enemy['y'] + enemy[KEY_RADIUS] / 2) * this.canvas.height);
        }
    }

    _gameCameraCoordinates() {
        let cameraX = Math.round((this.canvas.width / CANVAS_SCALE - this.movement.x * this.canvas.width - this.player.width / 2));
        let cameraY = Math.round((this.canvas.height / CANVAS_SCALE - this.movement.y * this.canvas.height - this.player.height / 2));
        return {x: cameraX, y: cameraY}
    }

}