
interface MenuBackgroundProps {
  isMoving: boolean;
}

const MenuBackground = ({ isMoving }: MenuBackgroundProps) => {
  return (
    <>
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-900/40" />
      
      {/* Animated overlay that responds to movement */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 transition-all duration-1000 ${
          isMoving ? 'opacity-80 scale-105' : 'opacity-40 scale-100'
        }`} 
      />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      
      {/* Dynamic light streaks */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 shadow-[inset_0_0_50px_rgba(139,92,246,0.1)]" />
    </>
  );
};

export default MenuBackground;
