
import { Shield, Lock, Mail, Link, Home, Info, FileText, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="w-full py-12 bg-cyber-dark border-t border-neon-blue/20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-neon-blue animate-pulse" size={24} />
              <h2 className="text-xl font-bold">
                <span className="cyber-text">DigiFoot</span> <span className="text-gray-300">Detective</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              Protecting your digital identity in an increasingly connected world.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
              <Link size={16} className="text-neon-blue" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition flex items-center gap-2">
                  <Home size={14} />
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-neon-blue transition flex items-center gap-2">
                  <Info size={14} />
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-neon-blue transition flex items-center gap-2">
                  <Shield size={14} />
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-neon-blue transition flex items-center gap-2">
                  <Mail size={14} />
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-neon-blue" />
              Privacy Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition">Privacy Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition">Security Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition">Data Protection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition">Learn More</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
              <Mail size={16} className="text-neon-blue" />
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest privacy tips.</p>
            <div className="flex">
              <Button className="neon-button">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neon-blue/20 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DigiFoot Detective. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
            <div className="px-3 py-1 bg-cyber-dark/40 backdrop-blur-md rounded-full flex items-center gap-2 text-xs text-neon-blue border border-neon-blue/20">
              <Lock size={12} />
              <span>SSL Secured</span>
            </div>
            <div className="px-3 py-1 bg-cyber-dark/40 backdrop-blur-md rounded-full flex items-center gap-2 text-xs text-neon-blue border border-neon-blue/20">
              <Eye size={12} />
              <span>Dark Web Scan</span>
            </div>
            <div className="px-3 py-1 bg-cyber-dark/40 backdrop-blur-md rounded-full flex items-center gap-2 text-xs text-neon-blue border border-neon-blue/20">
              <Zap size={12} />
              <span>Real-time Protection</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>This app uses mock data for educational purposes. In a real implementation, integration with Sherlock and HaveIBeenPwned APIs would be required.</p>
        </div>
      </div>
    </footer>
  );
};
