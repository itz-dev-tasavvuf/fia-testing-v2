
import { MenuItem } from "@/types/infiniteMenu";

interface FloatingUserCardsProps {
  menuItems: MenuItem[];
  currentIndex: number;
}

const FloatingUserCards = ({ menuItems, currentIndex }: FloatingUserCardsProps) => {
  return (
    <div className="absolute inset-4 pointer-events-none">
      {menuItems.slice(0, 6).map((item, index) => (
        <div
          key={index}
          className={`absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold transition-all duration-1000 ${
            index === currentIndex ? 'scale-125 ring-2 ring-cyan-400' : 'scale-100'
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
  );
};

export default FloatingUserCards;
