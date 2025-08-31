
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, LogOut, User, Mail, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Gravatar } from "@/components/Gravatar";

export default function Profile() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view your profile.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Get user info from localStorage
    const email = localStorage.getItem("userEmail");
    const created = localStorage.getItem("userCreatedAt");
    
    setUserEmail(email);
    setCreatedAt(created);
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate("/");
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "N/A";
    }
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
          <div className="flex items-center space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="website-container">
        <section className="website-section py-16">
          <div className="max-w-lg mx-auto animate-fade-in">
            <Card className="border border-slate-700 bg-slate-800/30 backdrop-blur-sm shadow-lg">
              <CardHeader className="space-y-3 text-center">
                <div className="flex justify-center mb-4">
                  {userEmail && <Gravatar email={userEmail} size={120} className="border-2 border-blue-400" />}
                </div>
                <CardTitle className="text-2xl font-bold text-white">User Profile</CardTitle>
                <CardDescription className="text-gray-400">
                  Your personal account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <Mail size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Email Address</h3>
                      <p className="text-base text-white mt-1">{userEmail || "Not available"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <Calendar size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Account Created</h3>
                      <p className="text-base text-white mt-1">{formatDate(createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <Info size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-300">Account Status</h3>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <p className="text-base text-white">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="outline"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
