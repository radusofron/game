import { Graphics } from "pixi.js";
import { Shape } from "./Shape";
import { SHAPE_HEIGHT } from "../constants";

// A simple polygon is a polygon that does not intersect itself and has no holes (https://en.wikipedia.org/wiki/Simple_polygon)
export abstract class SimplePolygon extends Shape {
  // Number of vertices
  protected abstract vertexCount(): number;

  // Angle of vertex `index`
  protected abstract vertexAngle(index: number): number;

  // Radius of vertex `index`
  protected abstract vertexRadius(index: number): number;

  private buildPoints(): number[] {
    const totalVertices = this.vertexCount();

    // Step 1: compute each vertex around the center per its configured angle and radius
    const points: number[] = [];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < totalVertices; i++) {
      const angle = this.vertexAngle(i);
      const r = this.vertexRadius(i);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push(x, y);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    // Step 2: scale so the polygon is exactly SHAPE_HEIGHT tall, then center both axes at the origin
    const scale = SHAPE_HEIGHT / (maxY - minY);
    const xOffset = ((maxX + minX) / 2) * scale;
    const yOffset = ((maxY + minY) / 2) * scale;
    return points.map((v, i) =>
      i % 2 === 0 ? v * scale - xOffset : v * scale - yOffset,
    );
  }

  halfWidth(): number {
    const points = this.buildPoints();
    let maxAbsX = 0;
    for (let i = 0; i < points.length; i += 2) {
      maxAbsX = Math.max(maxAbsX, Math.abs(points[i]));
    }
    return maxAbsX;
  }

  protected drawShape(g: Graphics): Graphics {
    return g.poly(this.buildPoints());
  }

  // For a simple polygon, we can compute the area via the Shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula)
  area(): number {
    const points = this.buildPoints();
    const totalVertices = points.length / 2;
    let sum = 0;
    for (let i = 0; i < totalVertices; i++) {
      const next = (i + 1) % totalVertices;
      const x1 = points[i * 2];
      const y1 = points[i * 2 + 1];
      const x2 = points[next * 2];
      const y2 = points[next * 2 + 1];
      sum += x1 * y2 - x2 * y1;
    }
    return Math.abs(sum) / 2;
  }
}
