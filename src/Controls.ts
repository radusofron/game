export class Controls {
  private readonly spawnFrequencyEl: HTMLElement;
  private readonly gravityEl: HTMLElement;
  private readonly listeners: Array<[HTMLButtonElement, () => void]> = [];

  constructor(
    onSpawnFrequencyChange: (delta: number) => void,
    onGravityChange: (delta: number) => void,
  ) {
    this.spawnFrequencyEl = document.querySelector<HTMLElement>(
      "#spawn-frequency .value",
    )!;
    this.gravityEl = document.querySelector<HTMLElement>("#gravity .value")!;

    // Buttons
    const [spawnMinus, spawnPlus] =
      document.querySelectorAll<HTMLButtonElement>("#spawn-frequency .btn");
    const [gravityMinus, gravityPlus] =
      document.querySelectorAll<HTMLButtonElement>("#gravity .btn");

    // Store references so destroy() can pass the same function identity to removeEventListener
    const onSpawnMinus = () => onSpawnFrequencyChange(-1);
    const onSpawnPlus = () => onSpawnFrequencyChange(1);
    const onGravityMinus = () => onGravityChange(-1);
    const onGravityPlus = () => onGravityChange(1);

    spawnMinus.addEventListener("click", onSpawnMinus);
    spawnPlus.addEventListener("click", onSpawnPlus);
    gravityMinus.addEventListener("click", onGravityMinus);
    gravityPlus.addEventListener("click", onGravityPlus);

    this.listeners.push(
      [spawnMinus, onSpawnMinus],
      [spawnPlus, onSpawnPlus],
      [gravityMinus, onGravityMinus],
      [gravityPlus, onGravityPlus],
    );
  }

  update(spawnFrequency: number, gravity: number): void {
    this.spawnFrequencyEl.textContent = spawnFrequency.toLocaleString();
    this.gravityEl.textContent = gravity.toLocaleString();
  }

  destroy(): void {
    for (const [button, handler] of this.listeners) {
      button.removeEventListener("click", handler);
    }
    this.listeners.length = 0;
  }
}
