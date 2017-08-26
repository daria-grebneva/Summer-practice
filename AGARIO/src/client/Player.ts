import {Circle} from "./Circle";
export interface IObject {
    acceleration: number;
}
export class Player extends Circle implements IObject {
    public acceleration: number;

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any, _radius: number, acceleration: number) {
        super(context, canvas, _x, _y, _width, _height, color, _radius);
        this.acceleration = acceleration;
    }

}

