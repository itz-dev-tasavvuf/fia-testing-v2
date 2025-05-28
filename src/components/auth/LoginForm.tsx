
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "@/data/mockData";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === loginForm.email);
    if (user) {
      navigate("/discover");
    }
  };

  return (
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
  );
};

export default LoginForm;
