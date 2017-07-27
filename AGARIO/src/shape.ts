export interface IShape {
    x: number;
    y: number;
    width: number;
    height: number;
    canvas: any;
    context: any;
}
export class Shape implements IShape {

    public x: number;
    public y: number;
    public width: number;
    public height: number;


    public canvas: any;
    public context: any;

    public color: any;

    constructor(canvas: any, _x: number, _y: number, _width: number, _height: number, color: any) {
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.color = color;
    }

    private get _x(): number {
        return this.x * this.canvas.width;
    }

    private get _y(): number {
        return this.y * this.canvas.height;
    }

    private get _width(): number {
        return this.width * this.canvas.width;
    }

    private get _height(): number {
        return this.height * this.canvas.height;
    }
}

