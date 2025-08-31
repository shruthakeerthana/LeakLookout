
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechStackInfo } from '@/components/TechStackInfo';
import { MarketOpportunity } from '@/components/MarketOpportunity';
import { VirusTotalSection } from '@/components/VirusTotalSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TechInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-cyber-dark">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px]"></div>
      </div>
      
      <nav className="website-nav w-full sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-neon-blue animate-pulse" size={24} />
            <h1 className="text-xl font-bold">
              <span className="cyber-text animate-neon-pulse">DigiFoot</span> <span className="text-gray-300 ml-2">Detective</span>
            </h1>
          </div>
          <Button 
            className="neon-button flex items-center gap-2" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </div>
      </nav>

      <div className="website-container relative z-10">
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-heading">
              Technical <span className="text-neon-blue animate-neon-pulse">Overview</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore the technology stack, APIs, and market opportunities behind DigiFoot Detective
            </p>
          </div>

          <Tabs defaultValue="tech" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="tech" className="flex items-center gap-2">
                <Code size={16} />
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="virustotal" className="flex items-center gap-2">
                <Shield size={16} />
                VirusTotal
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <TrendingUp size={16} />
                Market
              </TabsTrigger>
              <TabsTrigger value="apis" className="flex items-center gap-2">
                <Shield size={16} />
                API Demo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tech">
              <TechStackInfo />
            </TabsContent>

            <TabsContent value="virustotal">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold cyber-heading mb-4">VirusTotal Integration</h2>
                  <p className="text-gray-300">
                    Test our VirusTotal API integration by scanning URLs for malicious content.
                    This demonstrates real-time threat detection capabilities.
                  </p>
                </div>
                <VirusTotalSection />
              </div>
            </TabsContent>

            <TabsContent value="market">
              <MarketOpportunity />
            </TabsContent>

            <TabsContent value="apis">
              <div className="text-center">
                <h2 className="text-2xl font-bold cyber-heading mb-4">API Demonstrations</h2>
                <p className="text-gray-300 mb-8">
                  All our integrated APIs are demonstrated throughout the main application.
                  Return to the home page to test username searches, breach checking, and more.
                </p>
                <Button 
                  className="neon-button"
                  onClick={() => navigate("/")}
                >
                  Try Live Demo
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
