import {Rectangle} from "./rectangle";
export class Field extends Rectangle {
    constructor(canvas: any, _x: number, _y: number, _width: number, _height: number, color: any) {
        super(canvas, _x, _y, _width, _height, color);
    }
}
