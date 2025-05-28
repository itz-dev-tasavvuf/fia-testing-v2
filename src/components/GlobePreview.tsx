
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceGlobe from "@/components/SpaceGlobe";
import { mockUsers } from "@/data/mockData";

const GlobePreview = () => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <Card className="bg-slate-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-center">Our Global Community</CardTitle>
          <CardDescription className="text-purple-200 text-center">
            See where space innovators are located around the world
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="h-96">
            <SpaceGlobe users={mockUsers.slice(0, 12)} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default GlobePreview;
