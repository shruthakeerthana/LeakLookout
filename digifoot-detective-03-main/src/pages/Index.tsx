
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsernameInput } from "@/components/UsernameInput";
import { DashboardTrailScan } from "@/components/DashboardTrailScan";
import { LinkedAccountsList } from "@/components/LinkedAccountsList";
import { BreachAndLeakRecords } from "@/components/BreachAndLeakRecords";
import { DarkWebPresence } from "@/components/DarkWebPresence";
import { ExposureScore } from "@/components/ExposureScore";
import { PlatformList } from "@/components/PlatformList";
import { PrivacySuggestions } from "@/components/PrivacySuggestions";
import { EmptyState } from "@/components/EmptyState";
import { Separator } from "@/components/ui/separator";
import { InfoPanel } from "@/components/InfoPanel";
import { IpInfoPanel } from "@/components/IpInfoPanel";
import { BackendIntegrationNotice } from "@/components/BackendIntegrationNotice";
import { searchUsername } from "@/lib/usernameSearch";
import { SearchResult } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { SearchForm } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Shield, 
  ShieldCheck,
  ShieldAlert,
  User, 
  Database,
  Bell,
  FileSearch,
  FileText,
  Calendar,
  ArrowRight,
  Lock,
  Zap,
  Search,
  Mail,
  Share2,
  Link,
  Home,
  Info
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TrustBadges } from "@/components/TrustBadges";
import { CodeRain } from "@/components/CodeRain";

export default function Index() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"input"|"scan"|"show">("input");
  const [inputValues, setInputValues] = useState<{ usernames: string[] }>({ usernames: [] });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const { toast } = useToast();
  
  // Subtle animation effect
  useEffect(() => {
    const animateElements = document.querySelectorAll('.animate-fade-in');
    animateElements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  const handleSubmit = async (vals: { usernames: string[] }) => {
    if (!vals.usernames.length) {
      toast({
        title: "Error",
        description: "Please enter at least one username",
        variant: "destructive",
      });
      return;
    }
    setInputValues(vals);
    setStep("scan");
    setLoading(true);
    try {
      const primaryUsername = vals.usernames[0];
      const searchResult = await searchUsername(primaryUsername);

      setResult({
        ...searchResult,
        platforms: searchResult.platforms.map(p => ({
          ...p,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}-${primaryUsername}`
        }))
      });
      toast({
        title: "Scan Complete",
        description: `Found ${searchResult.platforms.length} platform matches and ${searchResult.breaches.length} breaches`,
      });
      setStep("show");
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "An error occurred during the search. Please try again.",
        variant: "destructive",
      });
      setStep("input");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMirrorSearch = async (input: string) => {
    if (!input) {
      toast({
        title: "Error",
        description: "Please enter a valid username",
        variant: "destructive",
      });
      return;
    }
    
    const usernames = [input];
    setInputValues({ usernames });
    setStep("scan");
    setLoading(true);
    try {
      const primaryUsername = usernames[0];
      const searchResult = await searchUsername(primaryUsername);

      setResult({
        ...searchResult,
        platforms: searchResult.platforms.map(p => ({
          ...p,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}-${primaryUsername}`
        }))
      });
      toast({
        title: "Scan Complete",
        description: `Found ${searchResult.platforms.length} platform matches and ${searchResult.breaches.length} breaches`,
      });
      setStep("show");
    } catch (error) {
      console.error("Mirror search error:", error);
      toast({
        title: "Error",
        description: "An error occurred during the search. Please try again.",
        variant: "destructive",
      });
      setStep("input");
    } finally {
      setLoading(false);
    }
  };

  const handleRescan = async () => {
    setLoading(true);
    setStep("scan");
    try {
      const primaryUsername = inputValues.usernames[0];
      const searchResult = await searchUsername(primaryUsername);

      setResult({
        ...searchResult,
        platforms: searchResult.platforms.map(p => ({
          ...p,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}-${primaryUsername}-${Date.now()}`
        }))
      });
      toast({
        title: "Scan Complete",
        description: `Found ${searchResult.platforms.length} platform matches and ${searchResult.breaches.length} breaches`,
      });
      setStep("show");
    } catch (error) {
      console.error("Rescan error:", error);
      toast({
        title: "Error",
        description: "An error occurred during the search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToInput = () => {
    setStep("input");
    setInputValues({ usernames: [] });
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Code Rain Background Animation */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <CodeRain />
      </div>
      
      {/* Navigation */}
      <nav className="website-nav w-full sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-neon-blue animate-pulse" size={24} />
            <h1 className="text-xl font-bold">
              <span className="cyber-text animate-neon-pulse">DigiFoot</span> <span className="text-gray-300 ml-2">Detective</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-neon-blue transition ml-8">Home</a>
            <a href="#about" className="text-gray-300 hover:text-neon-blue transition">About</a>
            <a href="#services" className="text-gray-300 hover:text-neon-blue transition">Services</a>
            <a href="/tech-info" className="text-gray-300 hover:text-neon-blue transition">Tech Info</a>
            <a href="#contact" className="text-gray-300 hover:text-neon-blue transition mr-12">Contact</a>
          </div>
          <Button 
            className="neon-button flex items-center gap-2" 
            onClick={() => navigate("/login")}
          >
            <User size={16} />
            Login
          </Button>
        </div>
      </nav>
      
      <div className="website-container relative z-10">
        <section className="py-16">
          {step === "input" && (
            <>
              <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in relative">
                <div className="absolute -top-20 left-0 right-0 h-40 bg-neon-blue/5 rounded-full blur-3xl"></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-heading">
                  Unmask Your <span className="text-neon-blue animate-neon-pulse">Online Identity</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Reveal the data trails you've left behind—before someone else does.
                </p>
                <h2 className="text-lg md:text-xl font-medium mb-6 text-neon-blue">
                  Scan. Detect. Protect. Your Identity Deserves It.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                  <div className="flex items-center justify-center gap-2 px-6 py-3 glass-card">
                    <Search size={20} className="text-neon-blue" />
                    <span className="text-gray-300">Username Search</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 px-6 py-3 glass-card">
                    <Lock size={20} className="text-neon-blue" />
                    <span className="text-gray-300">Privacy Protection</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 px-6 py-3 glass-card">
                    <Bell size={20} className="text-neon-blue" />
                    <span className="text-gray-300">Breach Alerts</span>
                  </div>
                </div>
              </div>
              
              <div className="panel animate-fade-in relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <InfoPanel />
                </div>
              </div>

              <div className="glass-card animate-fade-in mt-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-neon-glow opacity-20 pointer-events-none"></div>
                <h2 className="text-2xl font-bold mb-6 cyber-heading flex items-center justify-center gap-2">
                  <Search size={24} className="text-neon-blue" />
                  Digital Exposure Scanner
                </h2>
                <p className="text-center mb-6 text-gray-300">
                  Enter your email or alias to reveal exposure on the dark web, leaks, social traces, and more.
                </p>
                <div className="absolute -right-10 -top-10 w-40 h-40 radar-scanner opacity-30 pointer-events-none"></div>
                <SearchForm onSearch={handleQuickMirrorSearch} isLoading={loading} />
                <div className="flex justify-center my-3">
                  <div className="px-3 py-1 bg-cyber-dark/40 backdrop-blur-md rounded-full flex items-center gap-2 text-xs text-neon-cyan border border-neon-blue/20">
                    <Eye size={12} />
                    <span>Dark Web Scan Included</span>
                  </div>
                </div>
                <div className="my-3 text-gray-400 text-center text-xs">
                  <span className="flex items-center justify-center gap-2">
                    <Info size={12} className="text-neon-blue" /> 
                    or dive deeper with multiple usernames for comprehensive tracking
                  </span>
                </div>
              </div>
              
              {/* Interactive Features Panel */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 cyber-heading text-center">
                  Your Privacy Arsenal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard 
                    icon={<Database className="text-neon-blue" size={24} />}
                    title="Username Intel"
                    description="Track your alias across platforms and leaks"
                  />
                  <FeatureCard 
                    icon={<User className="text-neon-blue" size={24} />}
                    title="Privacy Shield"
                    description="Learn where your data is exposed"
                  />
                  <FeatureCard 
                    icon={<Bell className="text-neon-blue" size={24} />}
                    title="Breach Alerts"
                    description="Get real-time leak notifications"
                  />
                </div>
              </div>
            </>
          )}

          {step === "input" && (
            <>
              {/* How It Works - Process Steps */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 cyber-heading text-center">
                  How It Works
                </h2>
                <ProcessSteps />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="glass-card animate-fade-in">
                  <EmptyState onQuickSearch={handleQuickMirrorSearch} />
                </div>
                <div className="glass-card animate-fade-in">
                  <IpInfoPanel />
                </div>
              </div>
              
              {/* Trust and Credibility Section */}
              <div className="mt-16">
                <TrustBadges />
              </div>
            </>
          )}

          <Separator className="my-8 border-neon-blue/20" />
          
          <div className="glass-card text-sm text-gray-400 animate-fade-in">
            <BackendIntegrationNotice />
          </div>

          {step === "input" && (
            <div className="glass-card animate-fade-in mt-8">
              <UsernameInput onSubmit={handleSubmit} loading={loading} />
            </div>
          )}

          {step === "scan" && (
            <div className="w-full flex flex-col items-center glass-card p-6 animate-gentle-pulse">
              <DashboardTrailScan
                usernames={inputValues.usernames}
                onRescan={()=>{}}
                loading={true}
              />
              <span className="mt-3 text-neon-blue flex items-center gap-2">
                <Search className="animate-spin-slow" />
                <span>Scanning digital trail for information...</span>
              </span>
              <Button className="mt-6 neon-button" variant="outline" onClick={handleBackToInput} disabled={loading}>
                Back
              </Button>
            </div>
          )}

          {step === "show" && result && (
            <div className="animate-fade-in">
              <div className="glass-card mb-6">
                <DashboardTrailScan
                  usernames={inputValues.usernames}
                  onRescan={handleRescan}
                  loading={loading}
                />
                <div className="flex items-center justify-between mt-4">
                  <Button className="neon-button" variant="outline" onClick={handleBackToInput} disabled={loading}>
                    <Search size={16} className="mr-2" /> New Search
                  </Button>
                  
                  <Button 
                    className="bg-cyber-dark/50 hover:bg-cyber-dark border border-neon-blue/30 text-neon-blue"
                    onClick={() => {
                      toast({
                        title: "Share Link Generated",
                        description: "Link copied to clipboard (simulated)",
                      });
                    }}
                  >
                    <Share2 size={16} className="mr-2" /> Share Report
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="glass-card animate-float">
                  <ExposureScore 
                    score={result.exposureScore} 
                    level={result.exposureLevel}
                  />
                </div>
                <div className="glass-card">
                  <PlatformList platforms={result.platforms} />
                </div>
              </div>

              <div className="glass-card mb-6 animate-fade-in">
                {result.breaches.length > 0 ? (
                  <BreachAndLeakRecords breaches={result.breaches} />
                ) : (
                  <section className="py-4">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <ShieldAlert size={20} className="text-neon-blue" /> Data Breaches
                    </h3>
                    <div className="text-gray-400">No known data breaches found for this username... yet.</div>
                  </section>
                )}
              </div>

              <div className="glass-card mb-6 animate-fade-in">
                <PrivacySuggestions 
                  suggestions={result.suggestions} 
                  level={result.exposureLevel}
                />
              </div>

              <div className="glass-card mb-6 animate-fade-in">
                <DarkWebPresence 
                  found={result.exposureScore < 50} 
                  sources={result.exposureScore < 50 ? [
                    'Pastebin data dump (2022)',
                    'IRC chat logs',
                    'Database leak compilation'
                  ] : []}
                  username={inputValues.usernames[0]}
                />
              </div>
            </div>
          )}
        </section>
        
        <section id="about" className="py-16 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 cyber-heading">About <span className="text-neon-blue">DigiFoot Detective</span></h2>
            <p className="text-gray-300 mb-4">
              DigiFoot Detective is a powerful tool designed to help you discover and manage your digital footprint. 
              In today's connected world, understanding where your personal information exists online is crucial for 
              maintaining privacy and security.
            </p>
            <p className="text-gray-300">
              Our platform scans across hundreds of websites, data breaches, and the dark web to give you a complete 
              picture of your online presence, helping you take control of your digital identity.
            </p>
          </div>
        </section>
        
        <section id="services" className="py-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8 text-center cyber-heading">Our <span className="text-neon-blue">Services</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <Search size={32} className="text-neon-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Username Search</h3>
              <p className="text-gray-400 text-center">Find accounts connected to your username across multiple platforms.</p>
            </div>
            <div className="feature-card">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <Shield size={32} className="text-neon-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Breach Monitoring</h3>
              <p className="text-gray-400 text-center">Stay informed about data breaches affecting your personal information.</p>
            </div>
            <div className="feature-card">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <Lock size={32} className="text-neon-blue" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Privacy Protection</h3>
              <p className="text-gray-400 text-center">Get personalized advice to enhance your online privacy and security.</p>
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-16 animate-fade-in">
          <div className="max-w-2xl mx-auto glass-card">
            <h2 className="text-2xl font-bold mb-6 text-center cyber-heading">Contact <span className="text-neon-blue">Us</span></h2>
            <p className="text-center text-gray-300 mb-6">
              Have questions about our services? We're here to help!
            </p>
            <div className="text-center">
              <Button className="neon-button">
                <Mail size={16} className="mr-2" />
                Get in Touch
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <form className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4 cyber-heading text-center">Newsletter</h3>
                <p className="text-sm text-gray-400 mb-4 text-center">Stay updated on new leaks & threats</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow bg-cyber-dark/50 backdrop-blur-sm border border-neon-blue/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
                  />
                  <Button className="bg-neon-blue hover:bg-neon-cyan text-white">
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
