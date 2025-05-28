
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FounderSpotlight = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 mb-16">
      <Card className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 border-purple-400/50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/founder")}>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1 hover:scale-110 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/6731ef72-4baa-4010-b951-b408582b5f28.png"
                  alt="Firdaus Qayyum Jinabade"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
                <Star className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">Meet Our Founder</h3>
              <h4 className="text-xl text-purple-300 mb-4">Firdaus Qayyum Jinabade</h4>
              <p className="text-purple-100 mb-4 leading-relaxed">
                At just 18 years old, Firdaus is a passionate space enthusiast and Analog Astronaut. 
                Currently studying Aeronautical Engineering, she founded FIA to connect young minds 
                shaping the future of space exploration.
              </p>
              <Button 
                variant="outline" 
                className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FounderSpotlight;
