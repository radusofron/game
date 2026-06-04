import { RegularPolygon } from "./RegularPolygon";

export class Rectangle extends RegularPolygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 4, color);
  }
}
