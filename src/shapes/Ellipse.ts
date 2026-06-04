import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

export class Ellipse extends Shape {
  private readonly radiusX: number;
  private readonly radiusY: number;

  constructor(
    x: number,
    y: number,
    color: number = 0xffffff,
    radiusX: number = SHAPE_HEIGHT * 0.75,
    radiusY: number = SHAPE_HEIGHT / 2,
  ) {
    super(x, y, color, radiusY);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  protected drawShape(g: Graphics): Graphics {
    return g.ellipse(0, 0, this.radiusX, this.radiusY);
  }

  area(): number {
    return Math.PI * this.radiusX * this.radiusY;
  }

  halfWidth(): number {
    return this.radiusX;
  }
}
