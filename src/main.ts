import { Application } from "pixi.js";
import { Game } from "./Game";
import { EDGE_ZONE_BG_COLOR } from "./constants";

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
  pixiContainer.appendChild(app.canvas);

  new Game(app).start();
})();
