import { Polygon } from "./Polygon";

export class Pentagon extends Polygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 5, color);
  }
}
