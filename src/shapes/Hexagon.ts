import { RegularPolygon } from "./RegularPolygon";

export class Hexagon extends RegularPolygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 6, color);
  }
}
