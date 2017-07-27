import {Shape} from "./shape";
export interface ICircle {
    radius: number;
}

export class Circle extends Shape implements ICircle {
    public radius: number;

    constructor(canvas: any, color: any, _x: number, _y: number, _width: number, _height: number, _radius: number) {
        super(canvas, _x, _y, _width, _height, color);
        this.radius = _radius;
    }

    private get _radius(): number {
        return this.radius * this.canvas.height;
    }

    public draw(): void {
        console.log('draw Object Circle');
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.context.fill();
    }
}
