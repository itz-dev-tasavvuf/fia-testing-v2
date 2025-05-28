
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/discover");
  };

  const toggleInterest = (interest: string) => {
    const updated = registerForm.interests.includes(interest)
      ? registerForm.interests.filter(i => i !== interest)
      : [...registerForm.interests, interest];
    setRegisterForm({ ...registerForm, interests: updated });
  };

  return (
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
  );
};

export default RegisterForm;
