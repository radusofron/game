import { Polygon } from "./Polygon";

export class Rectangle extends Polygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 4, color);
  }
}
