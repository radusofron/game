import { RegularPolygon } from "./RegularPolygon";

export class Triangle extends RegularPolygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 3, color);
  }
}
