import {Circle} from "./circle"
export class Food extends Circle {
    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any, _radius: number) {
        super(context, canvas, _x, _y, _width, _height, color, _radius);
    }
}
