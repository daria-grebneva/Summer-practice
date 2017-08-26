import {Shape} from "./Shape";
export class Rectangle extends Shape {
    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scaledX: number, scaledY: number, scaledWidth: number, scaledHeight: number, color: any) {
        super(context, canvas, scaledX, scaledY, scaledWidth, scaledHeight, color);
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    }
}

