import { Shape } from "./Shape";
import { SHAPE_HEIGHT, BORDER_COLOR } from "../constants";

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
    super(x, y, Math.max(radiusX, radiusY), color);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.refresh();
  }

  protected draw(): void {
    this.graphics
      .ellipse(0, 0, this.radiusX, this.radiusY)
      .fill(this.color)
      .stroke({ width: 2, color: BORDER_COLOR });
  }

  protected drawOutlined(): void {
    this.outlineGraphics
      .ellipse(0, 0, this.radiusX, this.radiusY)
      .stroke({ width: 2, color: BORDER_COLOR });
  }
}
