
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ShinyText from "@/components/ShinyText";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">FIA</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-purple-200 hover:text-white hover:bg-purple-800/30"
            onClick={() => navigate("/discover")}
          >
            <ShinyText text="Discover" speed={4} className="text-inherit" />
          </Button>
          <Button 
            variant="ghost" 
            className="text-purple-200 hover:text-white hover:bg-purple-800/30"
            onClick={() => navigate("/founder")}
          >
            <ShinyText text="About Founder" speed={4} className="text-inherit" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
