import { Shape } from "./Shape";
import { SHAPE_HEIGHT, BORDER_COLOR } from "../constants";

export class Polygon extends Shape {
  protected readonly sides: number;

  constructor(x: number, y: number, sides: number, color: number = 0xffffff) {
    super(x, y, SHAPE_HEIGHT / 2, color);
    this.sides = sides;
    this.refresh();
  }

  private buildPoints(): number[] {
    const angleStep = (Math.PI * 2) / this.sides;

    // Step 1: compute all vertices on a unit circle (coordinates between -1 and 1)
    const points: number[] = [];
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < this.sides; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      points.push(x, y);
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    // Step 2: scale all coordinates so the polygon is exactly SHAPE_HEIGHT tall
    const scale = SHAPE_HEIGHT / (maxY - minY);
    return points.map((v) => v * scale);
  }

  protected draw(): void {
    this.graphics
      .poly(this.buildPoints())
      .fill(this.color)
      .stroke({ width: 2, color: BORDER_COLOR });
  }

  protected drawOutlined(): void {
    this.outlineGraphics
      .poly(this.buildPoints())
      .stroke({ width: 2, color: BORDER_COLOR });
  }
}
