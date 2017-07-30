import {Shape} from "./shape";
export class Rectangle extends Shape {
    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any) {
        super(context, canvas, _x, _y, _width, _height, color);
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this._x, this._y, this._width, this._height);
    }
}

