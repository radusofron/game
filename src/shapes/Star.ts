import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

export class Star extends Shape {
  // Distance from center to the tips
  private readonly outerRadius: number;
  // Distance from center to the valleys
  private readonly innerRadius: number;
  // Number of tips
  private readonly outerVertices: number;

  constructor(
    x: number,
    y: number,
    color: number = 0xffffff,
    outerRadius: number = SHAPE_HEIGHT / 2,
    innerRadius: number = SHAPE_HEIGHT / 5,
    outerVertices: number = 5,
  ) {
    super(x, y, outerRadius, color);
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
    this.outerVertices = outerVertices;
  }

  private buildPoints(): number[] {
    const totalVertices = this.outerVertices * 2;

    // Step 1: compute all vertices using the configured radii
    const points: number[] = [];
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < totalVertices; i++) {
      const angle = (i * Math.PI) / this.outerVertices;
      const r = i % 2 === 0 ? this.outerRadius : this.innerRadius;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push(x, y);
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    // Step 2: scale all coordinates so the star is exactly SHAPE_HEIGHT tall
    const scale = SHAPE_HEIGHT / (maxY - minY);
    return points.map((v) => v * scale);
  }

  protected drawShape(g: Graphics): Graphics {
    return g.poly(this.buildPoints());
  }
}
