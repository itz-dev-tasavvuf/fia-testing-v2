
import { MenuItem } from "@/types/infiniteMenu";

interface MenuOverlayProps {
  activeItem: MenuItem | null;
  isMoving: boolean;
  onButtonClick: () => void;
  currentIndex: number;
  totalItems: number;
}

const MenuOverlay = ({ activeItem, isMoving, onButtonClick, currentIndex, totalItems }: MenuOverlayProps) => {
  if (!activeItem) return null;

  return (
    <>
      {/* Enhanced title with better typography */}
      <div
        className={`
          select-none absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-700 ease-out z-20
          ${isMoving ? "opacity-0 translate-x-[-20px] pointer-events-none" : "opacity-100 translate-x-0 pointer-events-auto"}
        `}
      >
        <h2 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
          {activeItem.title}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
      </div>

      {/* Enhanced description with better styling */}
      <div
        className={`
          select-none absolute right-8 top-1/2 transform -translate-y-1/2 max-w-[300px] transition-all duration-700 ease-out z-20
          ${isMoving ? "opacity-0 translate-x-[20px] pointer-events-none" : "opacity-100 translate-x-0 pointer-events-auto"}
        `}
      >
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <p className="text-purple-100 text-lg leading-relaxed italic">
            "{activeItem.description}"
          </p>
          <div className="mt-3 text-sm text-cyan-300">
            {currentIndex + 1} of {totalItems}
          </div>
        </div>
      </div>

      {/* Enhanced action button */}
      <div
        onClick={onButtonClick}
        className={`
          absolute left-1/2 z-30 transition-all duration-700 ease-out cursor-pointer group
          ${isMoving 
            ? "bottom-[-100px] opacity-0 scale-0 -translate-x-1/2 pointer-events-none" 
            : "bottom-12 opacity-100 scale-100 -translate-x-1/2 pointer-events-auto hover:scale-110"
          }
        `}
      >
        {/* Button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Main button */}
        <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center border-4 border-white shadow-2xl group-hover:shadow-cyan-400/50 transition-all duration-300">
          <div className="w-6 h-6 border-r-2 border-t-2 border-white transform rotate-45 group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Button label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Profile
        </div>
      </div>

      {/* Enhanced instructions */}
      <div className={`absolute bottom-4 left-4 text-sm text-purple-300/80 z-20 transition-all duration-500 ${
        isMoving ? 'opacity-50' : 'opacity-100'
      }`}>
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
          Click to explore • Hover for details
        </div>
      </div>

      {/* Navigation hint */}
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 text-sm text-cyan-300/80 z-20 transition-all duration-500 ${
        isMoving ? 'opacity-100' : 'opacity-60'
      }`}>
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-400/20">
          ✨ Exploring Space Community
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;
