import { Application, Graphics, Rectangle } from "pixi.js";
import { Shape } from "../shapes/Shape";
import { EDGE_ZONE_HEIGHT, GAME_AREA_BG_COLOR } from "../constants";
export class GameLayer {
  private readonly container: Graphics;
  private readonly mask: Graphics;

  constructor(private readonly app: Application) {
    this.container = new Graphics();
    this.mask = new Graphics();
    this.container.mask = this.mask;

    this.buildMask();
    this.drawBackground();
    app.stage.addChild(this.container);

    app.renderer.on("resize", () => {
      this.buildMask();
      this.drawBackground();
    });
  }

  // Clip the game area to the middle zone, where filled shapes are visible and interactable
  private buildMask(): void {
    const { width: w, height: h } = this.app.screen;

    this.mask.clear();
    // fill() is required for the mask to work, but the mask itself is never displayed - its color is irrelevant
    this.mask
      .rect(0, EDGE_ZONE_HEIGHT, w, h - 2 * EDGE_ZONE_HEIGHT)
      .fill(0xffffff);

    // Mask only clips visuals; therefore, restricting clicks must be set separately
    this.container.hitArea = new Rectangle(
      0,
      EDGE_ZONE_HEIGHT,
      w,
      h - 2 * EDGE_ZONE_HEIGHT,
    );
  }

  private drawBackground(): void {
    const { width: w, height: h } = this.app.screen;
    this.container.clear();
    this.container
      .rect(0, EDGE_ZONE_HEIGHT, w, h - 2 * EDGE_ZONE_HEIGHT)
      .fill(GAME_AREA_BG_COLOR);
  }

  // Makes the game layer clickable
  setupClickInteractions(onEmptyClick: (x: number, y: number) => void): void {
    this.container.eventMode = "static";
    this.container.on("pointerdown", (e) =>
      onEmptyClick(e.global.x, e.global.y),
    );
  }

  // Makes the shape inside the game layer clickable
  setupShapeClick(shape: Shape, onShapeClick: () => void): void {
    shape.graphics.eventMode = "static";
    shape.graphics.on("pointerdown", (e) => {
      // Prevents the event from bubbling to the game layer handler
      e.stopPropagation();
      onShapeClick();
    });
  }

  addShape(shape: Shape): void {
    this.container.addChild(shape.graphics);
  }

  removeShape(shape: Shape): void {
    this.container.removeChild(shape.graphics);
  }
}
