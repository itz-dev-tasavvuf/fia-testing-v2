
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PixelCard from "@/components/PixelCard";
import InfiniteMenu from "@/components/InfiniteMenu";

const GlobePreview = () => {
  return (
    <section className="container mx-auto px-4 mb-16 relative z-10">
      <PixelCard variant="blue" className="rounded-3xl">
        <Card className="bg-transparent border-transparent rounded-3xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-4xl font-bold">Explore Our Community</CardTitle>
            <CardDescription className="text-purple-200 text-xl">
              Discover amazing space enthusiasts from around the world
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-10">
            <div className="h-96 w-full">
              <InfiniteMenu />
            </div>
          </CardContent>
        </Card>
      </PixelCard>
    </section>
  );
};

export default GlobePreview;
