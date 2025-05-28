
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthSection = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/80">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-purple-600">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="text-white data-[state=active]:bg-purple-600">
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
      </div>
    </section>
  );
};

export default AuthSection;
