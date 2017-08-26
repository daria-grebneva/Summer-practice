export interface IShape {
    x: number;
    y: number;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
}
export class Shape implements IShape {

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public color: any;
    public canvas: HTMLCanvasElement;

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scaledX: number, scaledY: number, scaledWidth: number, scaledHeight: number, color: any) {
        this.canvas = canvas;
        this.x = scaledX;
        this.y = scaledY;
        this.width = scaledWidth;
        this.height = scaledHeight;

        this.color = color;
    }

    public get scaledX(): number {
        return this.x * this.canvas.width;
    }

    public get scaledY(): number {
        return this.y * this.canvas.height;
    }

    public get scaledWidth(): number {
        return this.width * this.canvas.width;
    }

    public get scaledHeight(): number {
        return this.height * this.canvas.height;
    }
}

