import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

export class Circle extends Shape {
  constructor(
    x: number,
    y: number,
    color: number = 0xffffff,
    radius: number = SHAPE_HEIGHT / 2,
  ) {
    super(x, y, color, radius);
  }

  protected drawShape(g: Graphics): Graphics {
    return g.circle(0, 0, this.radius);
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
