
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="bg-purple-600/20 rounded-full p-4 w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Global Mapping</h3>
            <p className="text-purple-200">
              Pin your location on our interactive 3D globe and discover space enthusiasts worldwide.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-600/20 rounded-full p-4 w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Connections</h3>
            <p className="text-purple-200">
              Connect with peers based on shared interests in space medicine, rocketry, and more.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="bg-green-600/20 rounded-full p-4 w-fit mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Knowledge Sharing</h3>
            <p className="text-purple-200">
              Share your dreams, achievements, and collaborate on space-related projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
