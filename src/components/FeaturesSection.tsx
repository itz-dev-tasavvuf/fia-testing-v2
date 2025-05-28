
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Zap } from "lucide-react";
import PixelCard from "@/components/PixelCard";

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PixelCard variant="blue" className="rounded-2xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-600/30 rounded-full p-4 w-fit mx-auto mb-6">
                <MapPin className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Mapping</h3>
              <p className="text-purple-200 text-lg">
                Pin your location on our interactive 3D globe and discover space enthusiasts worldwide.
              </p>
            </CardContent>
          </Card>
        </PixelCard>

        <PixelCard variant="pink" className="rounded-2xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-600/30 rounded-full p-4 w-fit mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Connections</h3>
              <p className="text-purple-200 text-lg">
                Connect with peers based on shared interests in space medicine, rocketry, and more.
              </p>
            </CardContent>
          </Card>
        </PixelCard>

        <PixelCard variant="yellow" className="rounded-2xl">
          <Card className="bg-slate-800/70 backdrop-blur-sm border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105 rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="bg-green-600/30 rounded-full p-4 w-fit mx-auto mb-6">
                <Zap className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Knowledge Sharing</h3>
              <p className="text-purple-200 text-lg">
                Share your dreams, achievements, and collaborate on space-related projects.
              </p>
            </CardContent>
          </Card>
        </PixelCard>
      </div>
    </section>
  );
};

export default FeaturesSection;
