import { Graphics } from "pixi.js";
import { SHAPE_STROKE } from "../constants";

// Base class
export abstract class Shape {
  readonly graphics: Graphics;
  readonly outlineGraphics: Graphics;
  protected x: number;
  protected y: number;
  protected radius: number;
  protected color: number;

  constructor(x: number, y: number, color: number, radius: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.graphics = new Graphics();
    this.graphics.position.set(x, y);
    this.outlineGraphics = new Graphics();
    this.outlineGraphics.position.set(x, y);
  }

  static randomColor(): number {
    return Math.floor(Math.random() * 0xffffff);
  }

  protected abstract drawShape(g: Graphics): Graphics;

  abstract area(): number;

  draw(): void {
    this.drawShape(this.graphics).fill(this.color).stroke(SHAPE_STROKE);
    this.drawShape(this.outlineGraphics).stroke(SHAPE_STROKE);
  }

  update(delta: number, gravity: number): void {
    this.y += gravity * delta;
    this.graphics.position.y = this.y;
    this.outlineGraphics.position.y = this.y;
  }

  isInGameArea(top: number, bottom: number): boolean {
    return this.y + this.radius > top && this.y - this.radius < bottom;
  }

  isAtCanvasBottom(canvasHeight: number): boolean {
    return this.y + this.radius >= canvasHeight;
  }

  isOffCanvas(canvasHeight: number): boolean {
    return this.y - this.radius > canvasHeight;
  }

  destroy(): void {
    this.graphics.destroy();
    this.outlineGraphics.destroy();
  }
}
