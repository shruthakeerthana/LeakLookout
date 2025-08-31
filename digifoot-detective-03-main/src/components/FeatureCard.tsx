
import React from 'react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: boolean; // Optional prop to highlight important features
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, highlight = false }) => {
  return (
    <div className={`feature-card glass-card p-6 backdrop-blur-sm border ${highlight ? 'border-neon-blue' : 'border-neon-blue/20'} hover:border-neon-blue/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}>
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 via-neon-blue/0 to-neon-blue/0 group-hover:from-neon-blue/5 group-hover:via-neon-blue/10 group-hover:to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Subtle moving background pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 group-hover:opacity-20 transition-opacity"></div>
      
      {/* Pulsing dot indicator */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${highlight ? 'bg-neon-blue animate-pulse' : 'bg-neon-blue opacity-30 group-hover:opacity-70 animate-pulse'}`}></div>
      
      <div className="flex flex-col items-center relative z-10">
        <div className={`feature-icon mb-4 w-16 h-16 rounded-full ${highlight ? 'bg-neon-blue/30' : 'bg-neon-blue/20'} flex items-center justify-center shadow-lg ${highlight ? 'shadow-neon-blue/40' : 'shadow-neon-blue/20'} group-hover:shadow-neon-blue/40 transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold mb-2 text-center ${highlight ? 'text-neon-blue' : 'text-white'} group-hover:text-neon-blue transition-colors`}>{title}</h3>
        <p className="text-gray-400 text-center">{description}</p>
        
        {/* Animated underline on hover */}
        <div className="w-0 group-hover:w-1/3 h-0.5 bg-neon-blue mt-3 transition-all duration-300"></div>
        
        {/* New: Integration status badge for highlighted features */}
        {highlight && (
          <div className="mt-3 px-2 py-1 bg-neon-blue/20 rounded-full text-xs text-neon-blue font-medium">
            Integrated
          </div>
        )}
      </div>
    </div>
  );
};
