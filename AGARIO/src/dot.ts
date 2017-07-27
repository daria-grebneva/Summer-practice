import {Circle} from "./circle"
export class Dot extends Circle {
    constructor(canvas: any, color: any, x: number, y: number, width: number, height: number, _radius: number) {
        super(canvas, color, x, y, width, height, _radius);
    }
}
