import { RegularPolygon } from "./RegularPolygon";

export class Pentagon extends RegularPolygon {
  constructor(x: number, y: number, color: number = 0xffffff) {
    super(x, y, 5, color);
  }
}
