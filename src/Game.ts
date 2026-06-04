import { Application } from "pixi.js";
import { Shape } from "./shapes/Shape";
import { ShapeFactory } from "./shapes/ShapeFactory";
import { LayerManager } from "./layers/LayerManager";
import { Stats } from "./Stats";
import { Controls } from "./Controls";
import {
  GRAVITY,
  SPAWN_FREQUENCY,
  SHAPE_HEIGHT,
  EDGE_ZONE_HEIGHT,
} from "./constants";

export class Game {
  private readonly layerManager: LayerManager;
  private readonly shapes = new Set<Shape>();
  private readonly stats = new Stats();
  private readonly controls = new Controls(
    (delta) => this.onSpawnFrequencyChange(delta),
    (delta) => this.onGravityChange(delta),
  );
  private spawnTimer?: ReturnType<typeof setInterval>;
  private spawnFrequency = SPAWN_FREQUENCY;
  private gravity = GRAVITY;

  constructor(private readonly app: Application) {
    this.layerManager = new LayerManager(app, (x, y) => this.spawnShape(x, y));
  }

  start(): void {
    this.spawnTimer = setInterval(
      () => this.spawnShape(),
      1000 / this.spawnFrequency,
    );

    document.addEventListener("visibilitychange", () =>
      this.onVisibilityChange(),
    );

    this.app.ticker.add((time) => this.tick(time.deltaTime));
  }

  private onSpawnFrequencyChange(delta: number): void {
    // Minimum 1
    this.spawnFrequency = Math.max(1, this.spawnFrequency + delta);
    clearInterval(this.spawnTimer);
    this.spawnTimer = setInterval(
      () => this.spawnShape(),
      1000 / this.spawnFrequency,
    );
    this.controls.update(this.spawnFrequency, this.gravity);
  }

  private onGravityChange(delta: number): void {
    // Minimum 1
    this.gravity = Math.max(1, this.gravity + delta);
    this.controls.update(this.spawnFrequency, this.gravity);
  }

  // Spawns a shape into the canvas (at the given position, or at a random x along the top if no position is given) and adds it to the active shapes set
  private spawnShape(
    x = Math.random() * this.app.screen.width,
    y = SHAPE_HEIGHT / 2,
  ): void {
    const shape = ShapeFactory.createRandom(x, y);
    // Click interaction 2: click on an existing shape removes the shape
    this.layerManager.addShape(shape, () => this.removeShape(shape));
    this.shapes.add(shape);
  }

  // Removes the shape from the canvas and from the active shapes set
  private removeShape(shape: Shape): void {
    this.layerManager.removeShape(shape);
    this.shapes.delete(shape);
  }

  // Runs every frame: advances each shape, removes those that reached the bottom, refreshes the stats
  private tick(delta: number): void {
    for (const shape of this.shapes) {
      shape.update(delta, this.gravity);

      if (shape.isAtCanvasBottom(this.app.screen.height)) {
        this.removeShape(shape);
      }
    }

    const { count, area } = this.computeStats();
    this.stats.update(count, area);
  }

  // Computes the number of shapes and the total surface area occupied by the shapes in the game area
  private computeStats(): { count: number; area: number } {
    const top = EDGE_ZONE_HEIGHT;
    const bottom = this.app.screen.height - EDGE_ZONE_HEIGHT;
    let count = 0;
    let area = 0;
    for (const shape of this.shapes) {
      if (!shape.isInGameArea(top, bottom)) continue;

      count++;
      area += shape.area();
    }
    return { count, area };
  }

  // Pauses spawning and animation (basically, the game) while the tab is not visible, and resumes them when the tab is visible again
  private onVisibilityChange(): void {
    if (document.hidden) {
      clearInterval(this.spawnTimer);
      this.app.ticker.stop();
    } else {
      this.spawnTimer = setInterval(
        () => this.spawnShape(),
        1000 / this.spawnFrequency,
      );
      this.app.ticker.start();
    }
  }
}
