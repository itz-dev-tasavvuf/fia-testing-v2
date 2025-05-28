
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceGlobe from "@/components/SpaceGlobe";
import { mockUsers } from "@/data/mockData";
import PixelCard from "@/components/PixelCard";

const GlobePreview = () => {
  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <PixelCard variant="blue" className="rounded-3xl">
        <Card className="bg-transparent border-transparent rounded-3xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-4xl font-bold">Our Global Community</CardTitle>
            <CardDescription className="text-purple-200 text-xl">
              See where space innovators are located around the world
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-10">
            <div className="h-96">
              <SpaceGlobe users={mockUsers.slice(0, 12)} />
            </div>
          </CardContent>
        </Card>
      </PixelCard>
    </section>
  );
};

export default GlobePreview;
