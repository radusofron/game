import { Application } from "pixi.js";
import { Shape } from "./shapes/Shape";
import { ShapeFactory } from "./shapes/ShapeFactory";
import { LayerManager } from "./layers/LayerManager";
import { SPAWN_INTERVAL, EDGE_ZONE_BG_COLOR, SHAPE_HEIGHT } from "./constants";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  const pixiContainer = document.getElementById("pixi-container")!;
  await app.init({
    background: EDGE_ZONE_BG_COLOR,
    resizeTo: pixiContainer,
  });

  // Append the application canvas to the document body
  pixiContainer!.appendChild(app.canvas);

  const layerManager = new LayerManager(app);
  const shapes = new Set<Shape>();

  // Removes the shape from the canvas and from the active shapes set
  const removeShape = (shape: Shape) => {
    layerManager.removeShape(shape);
    shapes.delete(shape);
  };

  // Spawns a shape into the canvas (at the given position, or at a random x along the top if no position is given) and adds it to the active shapes set
  const spawnShape = (
    x = Math.random() * app.screen.width,
    y = SHAPE_HEIGHT / 2,
  ) => {
    const shape = ShapeFactory.createRandom(x, y);
    // Click interaction 1: click on an existing shape removes the shape
    layerManager.addShape(shape, () => removeShape(shape));
    shapes.add(shape);
  };

  // Click interaction 2: click on an empty area spawns a new shape
  layerManager.setupClickInteractions((x, y) => spawnShape(x, y));

  let spawnTimer = setInterval(spawnShape, SPAWN_INTERVAL);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(spawnTimer);
      app.ticker.stop();
    } else {
      spawnTimer = setInterval(spawnShape, SPAWN_INTERVAL);
      app.ticker.start();
    }
  });

  app.ticker.add((time) => {
    for (const shape of shapes) {
      shape.update(time.deltaTime);

      if (shape.isAtCanvasBottom(app.screen.height)) {
        removeShape(shape);
      }
    }
  });
})();
