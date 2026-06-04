import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

// A simple polygon is a polygon that does not intersect itself and has no holes (https://en.wikipedia.org/wiki/Simple_polygon)
export abstract class SimplePolygon extends Shape {
  // Number of vertices
  protected abstract vertexCount(): number;

  // Radius of vertex `index`
  protected abstract vertexRadius(index: number): number;

  private buildPoints(): number[] {
    const totalVertices = this.vertexCount();

    // Step 1: compute each vertex around the center per its configured radius
    const points: number[] = [];
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < totalVertices; i++) {
      const angle = (i * 2 * Math.PI) / totalVertices;
      const r = this.vertexRadius(i);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push(x, y);
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    // Step 2: scale all coordinates so the polygon is exactly SHAPE_HEIGHT tall
    const scale = SHAPE_HEIGHT / (maxY - minY);
    return points.map((v) => v * scale);
  }

  protected drawShape(g: Graphics): Graphics {
    return g.poly(this.buildPoints());
  }

  // For a simple polygon, we can compute the area via the Shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula)
  area(): number {
    const points = this.buildPoints();
    const vertices = points.length / 2;
    let sum = 0;
    for (let i = 0; i < vertices; i++) {
      const next = (i + 1) % vertices;
      const x1 = points[i * 2];
      const y1 = points[i * 2 + 1];
      const x2 = points[next * 2];
      const y2 = points[next * 2 + 1];
      sum += x1 * y2 - x2 * y1;
    }
    return Math.abs(sum) / 2;
  }
}
