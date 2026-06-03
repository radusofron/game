import { Polygon } from "./Polygon";

export class Triangle extends Polygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 3, color);
  }
}
