
import { Card, CardContent } from "@/components/ui/card";
import { Satellite, Globe, Target, Heart } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import PixelCard from "@/components/PixelCard";

const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <PixelCard variant="blue" className="rounded-xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 text-center hover:scale-105 transition-transform duration-300 rounded-xl">
            <CardContent className="p-6">
              <Satellite className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={1200} suffix="+" />
              </div>
              <p className="text-purple-200">Active Members</p>
            </CardContent>
          </Card>
        </PixelCard>
        
        <PixelCard variant="pink" className="rounded-xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 text-center hover:scale-105 transition-transform duration-300 rounded-xl">
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-purple-200">Countries</p>
            </CardContent>
          </Card>
        </PixelCard>
        
        <PixelCard variant="yellow" className="rounded-xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 text-center hover:scale-105 transition-transform duration-300 rounded-xl">
            <CardContent className="p-6">
              <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={300} suffix="+" />
              </div>
              <p className="text-purple-200">Projects</p>
            </CardContent>
          </Card>
        </PixelCard>
        
        <PixelCard variant="default" className="rounded-xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 text-center hover:scale-105 transition-transform duration-300 rounded-xl">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-purple-200">Connections</p>
            </CardContent>
          </Card>
        </PixelCard>
      </div>
    </section>
  );
};

export default StatsSection;
