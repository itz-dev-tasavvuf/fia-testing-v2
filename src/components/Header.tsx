
import { Button } from "@/components/ui/button";
import { Rocket, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShinyText from "@/components/ShinyText";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-10 container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">FIA</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-purple-200 hover:text-white hover:bg-purple-800/30"
            onClick={() => navigate("/discover")}
          >
            <ShinyText text="Discover" speed={2} className="text-purple-200 hover:text-white" />
          </Button>
          <Button 
            variant="ghost" 
            className="text-purple-200 hover:text-white hover:bg-purple-800/30"
            onClick={() => navigate("/globe")}
          >
            <ShinyText text="Globe" speed={2} className="text-purple-200 hover:text-white" />
          </Button>
          <Button 
            variant="ghost" 
            className="text-purple-200 hover:text-white hover:bg-purple-800/30"
            onClick={() => navigate("/founder")}
          >
            <ShinyText text="About Founder" speed={2} className="text-purple-200 hover:text-white" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden text-purple-200 hover:text-white hover:bg-purple-800/30"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20 md:hidden">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full text-left text-purple-200 hover:text-white hover:bg-purple-800/30"
                onClick={() => {
                  navigate("/discover");
                  setIsMenuOpen(false);
                }}
              >
                <ShinyText text="Discover" speed={2} className="text-purple-200" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-purple-200 hover:text-white hover:bg-purple-800/30"
                onClick={() => {
                  navigate("/globe");
                  setIsMenuOpen(false);
                }}
              >
                <ShinyText text="Globe" speed={2} className="text-purple-200" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-purple-200 hover:text-white hover:bg-purple-800/30"
                onClick={() => {
                  navigate("/founder");
                  setIsMenuOpen(false);
                }}
              >
                <ShinyText text="About Founder" speed={2} className="text-purple-200" />
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
