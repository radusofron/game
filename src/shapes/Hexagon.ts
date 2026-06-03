import { Polygon } from "./Polygon";

export class Hexagon extends Polygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 6, color);
  }
}
