
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Filter, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpaceGlobe from "@/components/SpaceGlobe";
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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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
    // Mock login - find user in mock data
    const user = mockUsers.find(u => u.email === loginForm.email);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate("/discover");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    const newUser = {
      id: Date.now(),
      name: registerForm.name,
      email: registerForm.email,
      location: registerForm.location,
      interests: registerForm.interests,
      dream: registerForm.dream,
      lat: Math.random() * 180 - 90, // Mock coordinates
      lng: Math.random() * 360 - 180,
      achievements: ["Joined SpaceConnect Community"]
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {currentUser.name}!</h1>
              <p className="text-purple-200">Continue your journey to the stars</p>
            </div>
            <Button 
              onClick={() => navigate("/discover")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Users className="mr-2 h-4 w-4" />
              Discover Community
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-100">
                <div className="space-y-4">
                  <div>
                    <Label className="text-purple-200">Location</Label>
                    <p className="flex items-center mt-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      {currentUser.location}
                    </p>
                  </div>
                  <div>
                    <Label className="text-purple-200">Dream</Label>
                    <p className="mt-1">{currentUser.dream}</p>
                  </div>
                  <div>
                    <Label className="text-purple-200">Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentUser.interests.map((interest: string) => (
                        <Badge key={interest} variant="secondary" className="bg-purple-600 text-white">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Global Community</CardTitle>
                <CardDescription className="text-purple-200">
                  See where other space enthusiasts are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <SpaceGlobe users={[currentUser, ...mockUsers.slice(0, 10)]} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SpaceConnect
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Connect with young minds shaping the future of space exploration. 
            Pin your location, share your dreams, and discover fellow space enthusiasts worldwide.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="login" className="text-white">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-white">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="bg-slate-800/80 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Welcome Back</CardTitle>
                  <CardDescription className="text-purple-200">
                    Enter your credentials to access your space community
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
                        className="bg-slate-700 border-purple-500/30 text-white"
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
                        className="bg-slate-700 border-purple-500/30 text-white"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Launch Into Community
                    </Button>
                  </form>
                  <p className="text-sm text-purple-300 mt-4">
                    Demo: Use any email from the discover page to login
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="bg-slate-800/80 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Join the Mission</CardTitle>
                  <CardDescription className="text-purple-200">
                    Create your profile and connect with the space community
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
                        className="bg-slate-700 border-purple-500/30 text-white"
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
                        className="bg-slate-700 border-purple-500/30 text-white"
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
                        className="bg-slate-700 border-purple-500/30 text-white"
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
                        className="bg-slate-700 border-purple-500/30 text-white"
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
                            className={`cursor-pointer text-xs ${
                              registerForm.interests.includes(interest)
                                ? "bg-purple-600 text-white"
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
                        className="bg-slate-700 border-purple-500/30 text-white"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Join SpaceConnect
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
