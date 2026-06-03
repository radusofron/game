import { Application, Container, Graphics } from "pixi.js";
import { Shape } from "../shapes/Shape";
import { EDGE_ZONE_HEIGHT } from "../constants";
export class EdgeLayer {
  private readonly container: Container;
  private readonly mask: Graphics;

  constructor(private readonly app: Application) {
    this.container = new Container();
    this.mask = new Graphics();
    this.container.mask = this.mask;

    this.buildMask();
    app.stage.addChild(this.container);

    app.renderer.on("resize", () => this.buildMask());
  }

  // Clip the edge zones to the top and bottom 100px, where outlined shapes are visible and not interactable
  private buildMask(): void {
    const { width: w, height: h } = this.app.screen;

    this.mask.clear();
    // fill() is required for the mask to work, but the mask itself is never displayed - its color is irrelevant
    this.mask.rect(0, 0, w, EDGE_ZONE_HEIGHT).fill(0xffffff);
    this.mask.rect(0, h - EDGE_ZONE_HEIGHT, w, EDGE_ZONE_HEIGHT).fill(0xffffff);
  }

  addShape(shape: Shape): void {
    this.container.addChild(shape.outlineGraphics);
  }

  removeShape(shape: Shape): void {
    this.container.removeChild(shape.outlineGraphics);
  }
}
