
import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 3, 
  className = '' 
}) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  const shineStyle = {
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
    backgroundSize: '200% 100%',
    animation: `shine ${speed}s ease-in-out infinite`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block'
  };

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
      <span
        className={className}
        style={shineStyle}
      >
        {text}
      </span>
    </>
  );
};

export default ShinyText;
