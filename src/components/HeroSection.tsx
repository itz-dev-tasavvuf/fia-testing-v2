
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative z-10 container mx-auto px-4 py-16">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
          Future Innovators in
          <br />
          <span className="text-6xl">Aerospace</span>
        </h1>
        <p className="text-2xl text-purple-200 max-w-4xl mx-auto mb-8 leading-relaxed">
          Global network for space enthusiasts 🌍 | Share knowledge, connect with others 🚀 | 
          Join FIA and explore the future! 🌌
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge className="bg-purple-600/80 text-white px-4 py-2 text-lg">
            <Globe className="mr-2 h-4 w-4" />
            Global Network
          </Badge>
          <Badge className="bg-blue-600/80 text-white px-4 py-2 text-lg">
            <Users className="mr-2 h-4 w-4" />
            Space Community
          </Badge>
          <Badge className="bg-green-600/80 text-white px-4 py-2 text-lg">
            <Rocket className="mr-2 h-4 w-4" />
            Future Ready
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
