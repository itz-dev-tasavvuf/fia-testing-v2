
import React, { useEffect, useRef, useState, MutableRefObject, FC } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@/types/infiniteMenu";
import { createUserMenuItems } from "@/utils/menuUtils";
import { InfiniteGridMenu } from "./InfiniteGridMenu";
import FloatingUserCards from "./FloatingUserCards";
import MenuOverlay from "./MenuOverlay";
import MenuBackground from "./MenuBackground";

interface InfiniteMenuProps {
  items?: MenuItem[];
}

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  const menuItems = items.length ? items : createUserMenuItems();

  useEffect(() => {
    const canvas = canvasRef.current;
    let sketch: InfiniteGridMenu | null = null;

    const handleActiveItem = (index: number) => {
      if (!menuItems.length) return;
      const itemIndex = index % menuItems.length;
      setActiveItem(menuItems[itemIndex]);
      setCurrentIndex(itemIndex);
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
    <div className="relative w-full h-full rounded-2xl overflow-hidden group">
      {/* Enhanced Background with multiple layers */}
      <MenuBackground isMoving={isMoving} />
      
      {/* Interactive canvas area with enhanced styling */}
      <div className="relative z-10 w-full h-full">
        <canvas
          id="infinite-grid-menu-canvas"
          ref={canvasRef}
          className="cursor-pointer w-full h-full transition-all duration-500 hover:brightness-110"
        />
      </div>

      {/* Enhanced floating user cards */}
      <FloatingUserCards 
        menuItems={menuItems} 
        currentIndex={currentIndex}
        isMoving={isMoving}
      />

      {/* Enhanced menu overlay */}
      <MenuOverlay 
        activeItem={activeItem} 
        isMoving={isMoving} 
        onButtonClick={handleButtonClick}
        currentIndex={currentIndex}
        totalItems={menuItems.length}
      />

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {menuItems.slice(0, 8).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex % 8
                  ? 'bg-cyan-400 w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-lg opacity-60" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-purple-400/50 rounded-bl-lg opacity-60" />
    </div>
  );
};

export default InfiniteMenu;
