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

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _x: number, _y: number, _width: number, _height: number, color: any) {
        this.canvas = canvas;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;

        this.color = color;
    }

    public get _x(): number {
        return this.x * this.canvas.width;
    }

    public get _y(): number {
        return this.y * this.canvas.height;
    }

    public get _width(): number {
        return this.width * this.canvas.width;
    }

    public get _height(): number {
        return this.height * this.canvas.height;
    }
}

