import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  User, 
  Rocket, 
  Globe, 
  Star, 
  ArrowRight, 
  Satellite,
  Target,
  Heart,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpaceGlobe from "@/components/SpaceGlobe";
import AnimatedCounter from "@/components/AnimatedCounter";
import FloatingElements from "@/components/FloatingElements";
import { mockUsers } from "@/data/mockData";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    interests: [] as string[],
    dream: ""
  });

  const spaceInterests = [
    "Space Medicine",
    "Rocketry", 
    "Astronomy",
    "Astrophysics",
    "Planetary Science",
    "Space Engineering",
    "Astrobiology",
    "Satellite Technology"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === loginForm.email);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate("/discover");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: registerForm.name,
      email: registerForm.email,
      location: registerForm.location,
      interests: registerForm.interests,
      dream: registerForm.dream,
      lat: Math.random() * 180 - 90,
      lng: Math.random() * 360 - 180,
      achievements: ["Joined FIA Community"]
    };
    
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    navigate("/discover");
  };

  const toggleInterest = (interest: string) => {
    const updated = registerForm.interests.includes(interest)
      ? registerForm.interests.filter(i => i !== interest)
      : [...registerForm.interests, interest];
    setRegisterForm({ ...registerForm, interests: updated });
  };

  if (isLoggedIn && currentUser) {
    navigate("/discover");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingElements />
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FIA</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-purple-200 hover:text-white hover:bg-purple-800/30"
              onClick={() => navigate("/discover")}
            >
              Discover
            </Button>
            <Button 
              variant="ghost" 
              className="text-purple-200 hover:text-white hover:bg-purple-800/30"
              onClick={() => navigate("/founder")}
            >
              About Founder
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Future Innovators in
            <br />
            <span className="text-6xl">Aerospace</span>
          </h1>
          <p className="text-2xl text-purple-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            Global network for space enthusiasts 🌍 | Share knowledge, connect with others 🚀 | 
            Join FIA and explore the future! 🌌
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-purple-600/80 text-white px-4 py-2 text-lg">
              <Globe className="mr-2 h-4 w-4" />
              Global Network
            </Badge>
            <Badge className="bg-blue-600/80 text-white px-4 py-2 text-lg">
              <Users className="mr-2 h-4 w-4" />
              Space Community
            </Badge>
            <Badge className="bg-green-600/80 text-white px-4 py-2 text-lg">
              <Rocket className="mr-2 h-4 w-4" />
              Future Ready
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="bg-slate-800/50 border-purple-500/30 text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <Satellite className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={1200} suffix="+" />
              </div>
              <p className="text-purple-200">Active Members</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-purple-500/30 text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-purple-200">Countries</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-purple-500/30 text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={300} suffix="+" />
              </div>
              <p className="text-purple-200">Projects</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-purple-500/30 text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-purple-200">Connections</p>
            </CardContent>
          </Card>
        </div>

        {/* Founder Spotlight */}
        <Card className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 border-purple-400/50 mb-16 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate("/founder")}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1 hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/lovable-uploads/6731ef72-4baa-4010-b951-b408582b5f28.png"
                    alt="Firdaus Qayyum Jinabade"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
                  <Star className="h-4 w-4 text-yellow-800" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">Meet Our Founder</h3>
                <h4 className="text-xl text-purple-300 mb-4">Firdaus Qayyum Jinabade</h4>
                <p className="text-purple-100 mb-4 leading-relaxed">
                  At just 18 years old, Firdaus is a passionate space enthusiast and Analog Astronaut. 
                  Currently studying Aeronautical Engineering, she founded FIA to connect young minds 
                  shaping the future of space exploration.
                </p>
                <Button 
                  variant="outline" 
                  className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        {/* Globe Preview */}
        <Card className="bg-slate-800/50 border-purple-500/30 mb-16">
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

        {/* Auth Section */}
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
              <Card className="bg-slate-800/80 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Welcome Back to FIA</CardTitle>
                  <CardDescription className="text-purple-200">
                    Continue your space exploration journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-purple-200">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-purple-200">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Launch Into FIA
                    </Button>
                  </form>
                  <p className="text-sm text-purple-300 mt-4 text-center">
                    Demo: Use any email from the discover page to login
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="bg-slate-800/80 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Join the Future</CardTitle>
                  <CardDescription className="text-purple-200">
                    Become part of the global space innovation community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-purple-200">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-email" className="text-purple-200">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="your@email.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-password" className="text-purple-200">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-purple-200">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={registerForm.location}
                        onChange={(e) => setRegisterForm({ ...registerForm, location: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-purple-200">Space Interests</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {spaceInterests.map((interest) => (
                          <Badge
                            key={interest}
                            variant={registerForm.interests.includes(interest) ? "default" : "outline"}
                            className={`cursor-pointer text-xs transition-all duration-200 ${
                              registerForm.interests.includes(interest)
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "border-purple-500 text-purple-200 hover:bg-purple-600 hover:text-white"
                            }`}
                            onClick={() => toggleInterest(interest)}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dream" className="text-purple-200">Your Space Dream</Label>
                      <Input
                        id="dream"
                        placeholder="What's your space exploration dream?"
                        value={registerForm.dream}
                        onChange={(e) => setRegisterForm({ ...registerForm, dream: e.target.value })}
                        className="bg-slate-700 border-purple-500/30 text-white focus:border-purple-400"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Join FIA Community
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
