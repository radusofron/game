import { ConvexPolygon } from "./ConvexPolygon";

export class Pentagon extends ConvexPolygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, color, 5);
  }
}
