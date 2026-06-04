import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

export class Circle extends Shape {
  constructor(
    x: number,
    y: number,
    radius: number = SHAPE_HEIGHT / 2,
    color: number = 0xffffff,
  ) {
    super(x, y, radius, color);
  }

  protected drawShape(g: Graphics): Graphics {
    return g.circle(0, 0, this.radius);
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
