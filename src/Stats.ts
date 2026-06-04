// Shows game stats into the DOM
export class Stats {
  private readonly countEl: HTMLElement;
  private readonly areaEl: HTMLElement;
  private count = -Infinity;
  private area = -Infinity;

  constructor() {
    this.countEl = document.querySelector<HTMLElement>("#shape-count .value")!;
    this.areaEl = document.querySelector<HTMLElement>("#shape-area .value")!;
  }

  update(count: number, area: number): void {
    if (count !== this.count) {
      this.count = count;
      this.countEl.textContent = String(count);
    }
    if (area !== this.area) {
      this.area = area;
      this.areaEl.textContent = String(Math.round(area));
    }
  }
}
