import { SimplePolygon } from "./SimplePolygon";
import { SHAPE_HEIGHT } from "../constants";

export class Star extends SimplePolygon {
  // Distance from center to the tips
  private readonly outerRadius: number;
  // Distance from center to the valleys
  private readonly innerRadius: number;
  // Number of tips
  private readonly outerVertices: number;

  constructor(
    x: number,
    y: number,
    outerRadius: number = SHAPE_HEIGHT / 2,
    innerRadius: number = SHAPE_HEIGHT / 5,
    outerVertices: number = 5,
    color: number = 0xffffff,
  ) {
    super(x, y, SHAPE_HEIGHT / 2, color);
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
    this.outerVertices = outerVertices;
  }

  protected vertexCount(): number {
    // In a star, each outer vertex is followed by an inner vertex
    return this.outerVertices * 2;
  }

  protected vertexRadius(index: number): number {
    // In a star, each outer vertex uses the outer radius, while each inner vertex uses the inner radius
    return index % 2 === 0 ? this.outerRadius : this.innerRadius;
  }
}
