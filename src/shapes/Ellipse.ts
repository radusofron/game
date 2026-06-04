import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

export class Ellipse extends Shape {
  private readonly radiusX: number;
  private readonly radiusY: number;

  constructor(
    x: number,
    y: number,
    radiusX: number = SHAPE_HEIGHT * 0.75,
    radiusY: number = SHAPE_HEIGHT / 2,
    color: number = 0xffffff,
  ) {
    super(x, y, radiusY, color);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  protected drawShape(g: Graphics): Graphics {
    return g.ellipse(0, 0, this.radiusX, this.radiusY);
  }

  area(): number {
    return Math.PI * this.radiusX * this.radiusY;
  }
}
