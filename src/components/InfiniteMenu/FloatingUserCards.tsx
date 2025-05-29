
import { MenuItem } from "@/types/infiniteMenu";

interface FloatingUserCardsProps {
  menuItems: MenuItem[];
  currentIndex: number;
  isMoving: boolean;
}

const FloatingUserCards = ({ menuItems, currentIndex, isMoving }: FloatingUserCardsProps) => {
  return (
    <div className="absolute inset-4 pointer-events-none z-20">
      {menuItems.slice(0, 8).map((item, index) => {
        const isActive = index === currentIndex % 8;
        const angle = (index * 45) + (Date.now() / 50) % 360;
        const radius = isActive ? 120 : 80 + Math.sin(Date.now() / 1000 + index) * 20;
        const x = 50 + Math.cos(angle * Math.PI / 180) * radius / 3;
        const y = 50 + Math.sin(angle * Math.PI / 180) * radius / 3;
        
        return (
          <div
            key={index}
            className={`absolute w-16 h-16 rounded-full transition-all duration-1000 backdrop-blur-sm ${
              isActive 
                ? 'scale-125 ring-4 ring-cyan-400/60 shadow-2xl shadow-cyan-400/30' 
                : 'scale-100 ring-2 ring-white/20'
            } ${
              isMoving ? 'opacity-70' : 'opacity-90'
            }`}
            style={{
              left: `${Math.max(0, Math.min(85, x))}%`,
              top: `${Math.max(0, Math.min(85, y))}%`,
              animationDelay: `${index * 0.1}s`,
              background: `linear-gradient(135deg, 
                hsl(${240 + index * 30}, 70%, 60%) 0%, 
                hsl(${260 + index * 30}, 80%, 70%) 100%)`
            }}
          >
            {/* Profile image placeholder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {item.title.charAt(0)}
            </div>
            
            {/* Hover effect overlay */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`} />
            
            {/* Active indicator */}
            {isActive && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingUserCards;
