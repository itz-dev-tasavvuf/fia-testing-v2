
import React, { useEffect, useRef, useState, MutableRefObject, FC } from "react";
import { mat4, vec3, quat } from "gl-matrix";
import { mockUsers } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

// Convert mock users to menu items
const userMenuItems: MenuItem[] = mockUsers.slice(0, 12).map(user => ({
  image: `https://picsum.photos/400/400?random=${user.id}&grayscale`,
  link: `/profile/${user.id}`,
  title: user.name,
  description: user.dream
}));

// Simplified WebGL implementation for better visibility
class InfiniteGridMenu {
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

const InfiniteMenu: FC<{ items?: MenuItem[] }> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuItems = items.length ? items : userMenuItems;

  useEffect(() => {
    const canvas = canvasRef.current;
    let sketch: InfiniteGridMenu | null = null;

    const handleActiveItem = (index: number) => {
      if (!menuItems.length) return;
      const itemIndex = index % menuItems.length;
      setActiveItem(menuItems[itemIndex]);
    };

    if (canvas) {
      sketch = new InfiniteGridMenu(
        canvas,
        menuItems,
        handleActiveItem,
        setIsMoving,
        (sk) => sk.run()
      );
    }

    const handleResize = () => {
      if (sketch) {
        sketch.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Set initial active item
    if (menuItems.length > 0) {
      setActiveItem(menuItems[0]);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuItems]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith("http")) {
      window.open(activeItem.link, "_blank");
    } else {
      navigate(activeItem.link);
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse" />
      
      {/* Interactive canvas area */}
      <canvas
        id="infinite-grid-menu-canvas"
        ref={canvasRef}
        className="cursor-pointer w-full h-full relative z-10"
      />

      {/* Floating user cards */}
      <div className="absolute inset-4 pointer-events-none">
        {menuItems.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className={`absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold transition-all duration-1000 ${
              index === (Math.floor(Date.now() / 3000) % menuItems.length) ? 'scale-125 ring-2 ring-cyan-400' : 'scale-100'
            }`}
            style={{
              left: `${20 + (index * 12)}%`,
              top: `${30 + Math.sin(index * 0.5) * 20}%`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            {item.title.charAt(0)}
          </div>
        ))}
      </div>

      {activeItem && (
        <>
          <h2
            className={`
              select-none absolute font-black text-3xl left-8 top-1/2 transform -translate-y-1/2 transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-white z-20
              ${isMoving ? "opacity-0 pointer-events-none duration-100" : "opacity-100 pointer-events-auto duration-500"}
            `}
          >
            {activeItem.title}
          </h2>

          <p
            className={`
              select-none absolute max-w-[250px] text-sm top-1/2 right-8 transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-purple-200 z-20 transform -translate-y-1/2
              ${isMoving ? "opacity-0 pointer-events-none duration-100" : "opacity-100 pointer-events-auto duration-500"}
            `}
          >
            "{activeItem.description}"
          </p>

          <div
            onClick={handleButtonClick}
            className={`
              absolute left-1/2 z-30 w-14 h-14 grid place-items-center bg-cyan-400 border-4 border-white rounded-full cursor-pointer transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] pointer-events-auto
              ${isMoving ? "bottom-[-80px] opacity-0 duration-100 scale-0 -translate-x-1/2" : "bottom-8 opacity-100 duration-500 scale-100 -translate-x-1/2 hover:scale-110"}
            `}
          >
            <p className="select-none relative text-black text-xl font-bold">→</p>
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 text-xs text-purple-300 z-20">
        Click to explore • Hover to see details
      </div>
    </div>
  );
};

export default InfiniteMenu;
