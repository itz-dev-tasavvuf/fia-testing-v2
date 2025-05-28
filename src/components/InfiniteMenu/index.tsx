
import React, { useEffect, useRef, useState, MutableRefObject, FC } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@/types/infiniteMenu";
import { createUserMenuItems } from "@/utils/menuUtils";
import { InfiniteGridMenu } from "./InfiniteGridMenu";
import FloatingUserCards from "./FloatingUserCards";
import MenuOverlay from "./MenuOverlay";

interface InfiniteMenuProps {
  items?: MenuItem[];
}

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuItems = items.length ? items : createUserMenuItems();

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

  const currentIndex = Math.floor(Date.now() / 3000) % menuItems.length;

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
      <FloatingUserCards menuItems={menuItems} currentIndex={currentIndex} />

      {/* Menu overlay with title, description and action button */}
      <MenuOverlay 
        activeItem={activeItem} 
        isMoving={isMoving} 
        onButtonClick={handleButtonClick} 
      />
    </div>
  );
};

export default InfiniteMenu;
