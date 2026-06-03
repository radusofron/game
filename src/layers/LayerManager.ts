import { Application } from "pixi.js";
import { Shape } from "../shapes/Shape";
import { GameLayer } from "./GameLayer";
import { EdgeLayer } from "./EdgeLayer";

export class LayerManager {
  private readonly gameLayer: GameLayer;
  private readonly edgeLayer: EdgeLayer;

  constructor(app: Application) {
    // EdgeLayer must be added to stage first so GameLayer renders on top
    this.edgeLayer = new EdgeLayer(app);
    this.gameLayer = new GameLayer(app);
  }

  setupClickInteractions(onEmptyClick: (x: number, y: number) => void): void {
    this.gameLayer.setupClickInteractions(onEmptyClick);
  }

  addShape(shape: Shape, onShapeClick: () => void): void {
    this.edgeLayer.addShape(shape);
    this.gameLayer.addShape(shape);
    this.gameLayer.setupShapeClick(shape, onShapeClick);
  }

  // Detach from layers, then destroy
  removeShape(shape: Shape): void {
    this.gameLayer.removeShape(shape);
    this.edgeLayer.removeShape(shape);
    shape.destroy();
  }
}
