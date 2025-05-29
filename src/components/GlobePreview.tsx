
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PixelCard from "@/components/PixelCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Globe, Rocket } from "lucide-react";

const GlobePreview = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <PixelCard variant="blue" className="rounded-3xl">
        <Card className="bg-transparent border-transparent rounded-3xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-4xl font-bold mb-4">Explore Our Community</CardTitle>
            <CardDescription className="text-purple-200 text-xl">
              Discover amazing space enthusiasts from around the world
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/20">
                <Globe className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Global Network</h3>
                <p className="text-purple-200">Connect with space enthusiasts worldwide</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/20">
                <Users className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Community</h3>
                <p className="text-blue-200">Share knowledge and experiences</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-green-600/20 backdrop-blur-sm border border-cyan-500/20">
                <Rocket className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-cyan-200">Shape the future of aerospace</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate("/discover")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </PixelCard>
    </section>
  );
};

export default GlobePreview;
