import {Circle} from "./circle";
export interface IObject {
    acceleration: number;
}
export class GameObject extends Circle implements IObject {
    public acceleration: number;

   constructor(canvas: any, color: any, _x: number, _y: number, _width: number, _height: number, _radius: number, acceleration: number) {
        super(canvas, color, _x, _y, _width, _height, _radius);
        this.acceleration = acceleration;
    }

    public move(coordX: number, coordY: number): void {
        console.log('moving');
        let xDistance: number = coordX - this.x;
        let yDistance: number = coordY - this.y;
        let distance: number = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        if (distance > 0) {
            this.x += xDistance * this.acceleration;
            this.y += yDistance * this.acceleration;
        }
    }
}
