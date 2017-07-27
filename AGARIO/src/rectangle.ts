import {Shape} from "./shape";
export class Rectangle extends Shape {
    constructor(canvas: any, _x: number, _y: number, _width: number, _height: number, color: any) {
        super(canvas, _x, _y, _width, _height, color);
    }

   public draw(): void {
       console.log('draw Field');
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}

