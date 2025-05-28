
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import PixelCard from "@/components/PixelCard";

const AuthSection = () => {
  return (
    <section className="container mx-auto px-4 pb-16 relative z-10">
      <div className="max-w-md mx-auto">
        <PixelCard variant="default" className="rounded-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/90 backdrop-blur-sm rounded-xl">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-purple-600 rounded-lg">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-purple-600 rounded-lg">
                Join FIA
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </PixelCard>
      </div>
    </section>
  );
};

export default AuthSection;
