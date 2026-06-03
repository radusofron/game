import { Graphics } from "pixi.js";
import { GRAVITY } from "../constants";

// Base class
export abstract class Shape {
  readonly graphics: Graphics;
  readonly outlineGraphics: Graphics;
  protected x: number;
  protected y: number;
  protected radius: number;
  protected color: number;

  constructor(x: number, y: number, radius: number, color: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.graphics = new Graphics();
    this.graphics.position.set(x, y);
    this.outlineGraphics = new Graphics();
    this.outlineGraphics.position.set(x, y);
  }

  static randomColor(): number {
    return Math.floor(Math.random() * 0xffffff);
  }

  protected abstract draw(): void;
  protected abstract drawOutlined(): void;

  // Clears the previous draw before redrawing to prevent overlapping "filled" with "outlined" appearances
  refresh(): void {
    this.graphics.clear();
    this.draw();
    this.outlineGraphics.clear();
    this.drawOutlined();
  }

  update(delta: number): void {
    this.y += GRAVITY * delta;
    this.graphics.position.y = this.y;
    this.outlineGraphics.position.y = this.y;
  }

  isOffCanvas(canvasHeight: number): boolean {
    return this.y - this.radius > canvasHeight;
  }

  destroy(): void {
    this.graphics.destroy();
    this.outlineGraphics.destroy();
  }
}
