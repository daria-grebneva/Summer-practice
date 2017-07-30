import {Circle} from "./circle";
export interface IObject {
    acceleration: number;
}
export class GameObject extends Circle implements IObject {
    public acceleration: number;

   constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any, _radius: number, acceleration: number) {
        super(context, canvas, _x, _y, _width, _height, color, _radius);
        this.acceleration = acceleration;
    }

    public move(coordX: number, coordY: number): void {
        let xDistance: number = coordX - this.x;
        let yDistance: number = coordY - this.y;
        let distance: number = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        if (distance > 0) {
            this.x += xDistance * this.acceleration;
            this.y += yDistance * this.acceleration;
        }
    }
}
