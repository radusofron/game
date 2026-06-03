import { Shape } from "./Shape";
import { SHAPE_HEIGHT, BORDER_COLOR } from "../constants";

export class Circle extends Shape {
  constructor(
    x: number,
    y: number,
    color: number = 0xffffff,
    radius: number = SHAPE_HEIGHT / 2,
  ) {
    super(x, y, radius, color);
    this.refresh();
  }

  protected draw(): void {
    this.graphics
      .circle(0, 0, this.radius)
      .fill(this.color)
      .stroke({ width: 2, color: BORDER_COLOR });
  }

  protected drawOutlined(): void {
    this.outlineGraphics
      .circle(0, 0, this.radius)
      .stroke({ width: 2, color: BORDER_COLOR });
  }
}
