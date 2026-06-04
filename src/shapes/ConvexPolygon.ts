import { SimplePolygon } from "./SimplePolygon";
import { SHAPE_HEIGHT } from "../constants";

// A convex polygon is a simple polygon where all interior angles are less than 180° (https://en.wikipedia.org/wiki/Convex_polygon)
export abstract class ConvexPolygon extends SimplePolygon {
  private readonly sides: number;
  private readonly angles: number[];

  constructor(x: number, y: number, color: number, sides: number) {
    super(x, y, color, SHAPE_HEIGHT / 2);
    this.sides = sides;

    this.angles = Array.from(
      { length: sides },
      () => Math.random() * 2 * Math.PI,
    ).sort((a, b) => a - b);
  }

  protected vertexCount(): number {
    return this.sides;
  }

  protected vertexAngle(index: number): number {
    return this.angles[index];
  }

  protected vertexRadius(): number {
    return 1;
  }
}
