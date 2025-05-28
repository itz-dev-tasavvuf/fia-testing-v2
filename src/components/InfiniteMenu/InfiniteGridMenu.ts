
import { MenuItem } from "@/types/infiniteMenu";

export class InfiniteGridMenu {
  private canvas: HTMLCanvasElement;
  private items: MenuItem[] = [];
  private currentIndex = 0;
  private rotationSpeed = 0.02;
  private isRotating = true;
  private onActiveItemChange: (index: number) => void;
  private onMovementChange: (isMoving: boolean) => void;

  constructor(
    canvas: HTMLCanvasElement,
    items: MenuItem[],
    onActiveItemChange: (index: number) => void,
    onMovementChange: (isMoving: boolean) => void,
    onReady: (sketch: InfiniteGridMenu) => void
  ) {
    this.canvas = canvas;
    this.items = items;
    this.onActiveItemChange = onActiveItemChange;
    this.onMovementChange = onMovementChange;
    
    this.init();
    onReady(this);
  }

  private init() {
    // Set initial active item
    if (this.items.length > 0) {
      this.onActiveItemChange(0);
    }
    
    // Add mouse interaction
    this.canvas.addEventListener('mousedown', () => {
      this.isRotating = false;
      this.onMovementChange(true);
    });
    
    this.canvas.addEventListener('mouseup', () => {
      this.isRotating = true;
      this.onMovementChange(false);
    });
    
    this.canvas.addEventListener('click', () => {
      // Cycle through items on click
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.onActiveItemChange(this.currentIndex);
    });
  }

  public run() {
    this.animate();
  }

  private animate() {
    if (this.isRotating) {
      this.currentIndex = Math.floor(Date.now() / 3000) % this.items.length;
      this.onActiveItemChange(this.currentIndex);
    }
    
    requestAnimationFrame(() => this.animate());
  }

  public resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }
}
