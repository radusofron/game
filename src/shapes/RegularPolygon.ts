import { SimplePolygon } from "./SimplePolygon";
import { SHAPE_HEIGHT } from "../constants";

// A regular polygon - equilateral and equiangular
export class RegularPolygon extends SimplePolygon {
  protected readonly sides: number;

  constructor(x: number, y: number, sides: number, color: number = 0xffffff) {
    super(x, y, SHAPE_HEIGHT / 2, color);
    this.sides = sides;
  }

  protected vertexCount(): number {
    // In a polygon (regular or not), each vertex is followed by a side
    return this.sides;
  }

  protected vertexRadius(): number {
    // In a regular polygon, each vertex is placed at the same distance from the center
    return 1;
  }
}
