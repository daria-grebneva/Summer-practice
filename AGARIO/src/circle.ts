import {Shape} from "./shape";
export interface ICircle {
    radius: number;
}

export class Circle extends Shape implements ICircle {
    public radius: number;

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any, scaledRadius: number) {
        super(context, canvas, _x, _y, _width, _height, color);
        this.radius = scaledRadius;
    }

    public get scaledRadius(): number {
        return this.radius * this.canvas.height;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x * this.canvas.width, this.y * this.canvas.height, this.radius* this.canvas.width, 0, Math.PI * 2);
        context.fill();
    }
}
