
import { useEffect, useState } from "react";
import { Rocket, Satellite, Star, Globe } from "lucide-react";

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const elements = [
    { Icon: Rocket, delay: "0s", position: "top-20 left-10" },
    { Icon: Satellite, delay: "1s", position: "top-40 right-20" },
    { Icon: Star, delay: "2s", position: "bottom-40 left-20" },
    { Icon: Globe, delay: "3s", position: "bottom-20 right-10" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-20 animate-pulse`}
          style={{ animationDelay: delay }}
        >
          <Icon className="h-8 w-8 text-purple-300" />
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
