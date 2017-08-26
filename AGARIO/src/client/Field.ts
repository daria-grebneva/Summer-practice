import {Rectangle} from "./Rectangle";
export class Field extends Rectangle {
    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any) {
        super(context, canvas, _x, _y, _width, _height, color);
    }
}
