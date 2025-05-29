
import { MenuItem } from "@/types/infiniteMenu";

export class InfiniteGridMenu {
  private canvas: HTMLCanvasElement;
  private items: MenuItem[] = [];
  private currentIndex = 0;
  private lastActiveIndex = -1; // Track last active index to prevent infinite updates
  private rotationSpeed = 0.02;
  private isRotating = true;
  private onActiveItemChange: (index: number) => void;
  private onMovementChange: (isMoving: boolean) => void;
  private animationId: number | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private lastTime = 0;

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
    this.ctx = canvas.getContext('2d');
    
    this.init();
    onReady(this);
  }

  private init() {
    // Set initial active item only once
    if (this.items.length > 0 && this.lastActiveIndex === -1) {
      this.lastActiveIndex = 0;
      this.onActiveItemChange(0);
    }
    
    // Add enhanced mouse interaction
    this.canvas.addEventListener('mousedown', () => {
      this.isRotating = false;
      this.onMovementChange(true);
    });
    
    this.canvas.addEventListener('mouseup', () => {
      this.isRotating = true;
      this.onMovementChange(false);
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      this.isRotating = true;
      this.onMovementChange(false);
    });
    
    this.canvas.addEventListener('click', () => {
      // Cycle through items on click with smooth transition
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      if (this.currentIndex !== this.lastActiveIndex) {
        this.lastActiveIndex = this.currentIndex;
        this.onActiveItemChange(this.currentIndex);
      }
    });

    // Add touch support for mobile
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.isRotating = false;
      this.onMovementChange(true);
    });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.isRotating = true;
      this.onMovementChange(false);
    });
  }

  public run() {
    this.animate();
  }

  private animate() {
    const currentTime = Date.now();
    
    // Only update active item every 3 seconds and only if it changed
    if (this.isRotating && currentTime - this.lastTime > 3000) {
      const newIndex = Math.floor(currentTime / 3000) % this.items.length;
      if (newIndex !== this.lastActiveIndex) {
        this.currentIndex = newIndex;
        this.lastActiveIndex = newIndex;
        this.onActiveItemChange(this.currentIndex);
      }
      this.lastTime = currentTime;
    }
    
    // Add visual effects to canvas
    this.drawVisualEffects();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private drawVisualEffects() {
    if (!this.ctx) return;
    
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw animated particles or grid
    const time = Date.now() * 0.001;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw subtle animated grid
    this.ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + time * 0.5;
      const radius = 50 + Math.sin(time + i) * 20;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }

  public resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
