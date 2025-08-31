
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, Lock, Eye, EyeOff, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Gravatar } from "@/components/Gravatar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    if (isRegisterMode && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        const action = isRegisterMode ? "Registration" : "Login";
        toast({
          title: `${action} Successful`,
          description: isRegisterMode ? "Your account has been created!" : "Welcome back!",
        });
        
        // Store user info in localStorage for demo purposes
        // In a real app, this would be handled by a proper auth system
        if (isRegisterMode) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userCreatedAt", new Date().toISOString());
        }
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        
        navigate("/profile");
      } else {
        toast({
          title: `${isRegisterMode ? "Registration" : "Login"} Failed`,
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Navigation */}
      <nav className="website-nav w-full bg-slate-800/80 backdrop-blur-md sticky top-0 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold">
              <span className="text-blue-500 animate-gentle-pulse">DigiFoot</span> <span className="text-gray-300">Detective</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-300 hover:text-blue-400 transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition">About</a>
            <a href="#services" className="text-gray-300 hover:text-blue-400 transition">Services</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition">Contact</a>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </nav>

      <div className="website-container">
        <section className="website-section py-16">
          <div className="max-w-md mx-auto animate-fade-in">
            <Card className="border border-slate-700 bg-slate-800/30 backdrop-blur-sm shadow-lg">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {isRegisterMode ? (
                      <UserPlus size={24} className="text-blue-400 animate-gentle-pulse" />
                    ) : (
                      <Shield size={24} className="text-blue-400 animate-gentle-pulse" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {isRegisterMode ? "Create Account" : "Sign In"}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {isRegisterMode 
                    ? "Enter your details to create a new account" 
                    : "Enter your email and password to access your account"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isRegisterMode && email && (
                  <Gravatar email={email} size={80} className="mx-auto mb-4 border-blue-400" />
                )}
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Mail size={16} />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9 bg-slate-900/50 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-300">Password</Label>
                      {!isRegisterMode && (
                        <a href="#" className="text-xs text-blue-400 hover:underline">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Lock size={16} />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 pr-9 bg-slate-900/50 border-slate-700 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  {isRegisterMode && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Lock size={16} />
                        </div>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-9 pr-9 bg-slate-900/50 border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading 
                      ? (isRegisterMode ? "Creating account..." : "Signing in...") 
                      : (isRegisterMode ? "Create Account" : "Sign In")
                    }
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 text-center">
                <div className="text-sm text-gray-400">
                  {isRegisterMode 
                    ? "Already have an account? " 
                    : "Don't have an account? "
                  }
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => setIsRegisterMode(!isRegisterMode)}
                  >
                    {isRegisterMode ? "Sign in" : "Register"}
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  By {isRegisterMode ? "registering" : "signing in"}, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
