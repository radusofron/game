import { Shape } from "./Shape";

import { Triangle } from "./Triangle";
import { Rectangle } from "./Rectangle";
import { Pentagon } from "./Pentagon";
import { Hexagon } from "./Hexagon";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Star } from "./Star";

type ShapeConstructor = new (x: number, y: number, color: number) => Shape;

const SHAPE_TYPES = {
  triangle: Triangle,
  rectangle: Rectangle,
  pentagon: Pentagon,
  hexagon: Hexagon,
  circle: Circle,
  ellipse: Ellipse,
  star: Star,
} satisfies Record<string, ShapeConstructor>;

export type ShapeName = keyof typeof SHAPE_TYPES;

export class ShapeFactory {
  static create(name: ShapeName, x: number, y: number, color: number): Shape {
    return new SHAPE_TYPES[name](x, y, color);
  }

  static createRandom(x: number, y: number): Shape {
    const names = Object.keys(SHAPE_TYPES) as ShapeName[];
    const name = names[Math.floor(Math.random() * names.length)];
    return ShapeFactory.create(name, x, y, Shape.randomColor());
  }
}
