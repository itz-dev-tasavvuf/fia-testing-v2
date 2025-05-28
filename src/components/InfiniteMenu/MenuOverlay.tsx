
import { MenuItem } from "@/types/infiniteMenu";

interface MenuOverlayProps {
  activeItem: MenuItem | null;
  isMoving: boolean;
  onButtonClick: () => void;
}

const MenuOverlay = ({ activeItem, isMoving, onButtonClick }: MenuOverlayProps) => {
  if (!activeItem) return null;

  return (
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
        onClick={onButtonClick}
        className={`
          absolute left-1/2 z-30 w-14 h-14 grid place-items-center bg-cyan-400 border-4 border-white rounded-full cursor-pointer transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] pointer-events-auto
          ${isMoving ? "bottom-[-80px] opacity-0 duration-100 scale-0 -translate-x-1/2" : "bottom-8 opacity-100 duration-500 scale-100 -translate-x-1/2 hover:scale-110"}
        `}
      >
        <p className="select-none relative text-black text-xl font-bold">→</p>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 text-xs text-purple-300 z-20">
        Click to explore • Hover to see details
      </div>
    </>
  );
};

export default MenuOverlay;
