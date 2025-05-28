
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative z-10 container mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-fade-in">
        <h1 className="text-8xl font-black text-white mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
          Future Innovators in
          <br />
          <span className="text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aerospace
          </span>
        </h1>
        <p className="text-2xl text-purple-200 max-w-5xl mx-auto mb-10 leading-relaxed font-medium">
          Global network for space enthusiasts 🌍 | Share knowledge, connect with others 🚀 | 
          Join FIA and explore the future! 🌌
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <Badge className="bg-purple-600/90 text-white px-6 py-3 text-xl font-semibold rounded-full backdrop-blur-sm">
            <Globe className="mr-3 h-6 w-6" />
            Global Network
          </Badge>
          <Badge className="bg-blue-600/90 text-white px-6 py-3 text-xl font-semibold rounded-full backdrop-blur-sm">
            <Users className="mr-3 h-6 w-6" />
            Space Community
          </Badge>
          <Badge className="bg-green-600/90 text-white px-6 py-3 text-xl font-semibold rounded-full backdrop-blur-sm">
            <Rocket className="mr-3 h-6 w-6" />
            Future Ready
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
