
import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
          <ShieldCheck className="text-neon-blue" size={20} />
          <span className="cyber-heading">Trusted by 10,000+ users worldwide</span>
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          <img 
            src="https://api.dicebear.com/7.x/shapes/svg?seed=hackernews" 
            alt="Hacker News" 
            className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
          />
          <img 
            src="https://api.dicebear.com/7.x/shapes/svg?seed=reddit" 
            alt="Reddit" 
            className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
          />
          <img 
            src="https://api.dicebear.com/7.x/shapes/svg?seed=producthunt" 
            alt="Product Hunt" 
            className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
          />
          <img 
            src="https://api.dicebear.com/7.x/shapes/svg?seed=techcrunch" 
            alt="TechCrunch" 
            className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center py-3 px-6 glass">
            <div className="text-2xl font-bold text-neon-blue">12k+</div>
            <div className="text-sm text-gray-400">Scans Completed</div>
          </div>
          
          <div className="flex flex-col items-center py-3 px-6 glass">
            <div className="text-2xl font-bold text-neon-blue">300+</div>
            <div className="text-sm text-gray-400">Platforms Checked</div>
          </div>
          
          <div className="flex flex-col items-center py-3 px-6 glass">
            <div className="text-2xl font-bold text-neon-blue">5k+</div>
            <div className="text-sm text-gray-400">Vulnerabilities Found</div>
          </div>
          
          <div className="flex flex-col items-center py-3 px-6 glass">
            <div className="text-2xl font-bold text-neon-blue">98%</div>
            <div className="text-sm text-gray-400">Customer Satisfaction</div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-neon-blue">
            <Users size={18} />
            <span className="text-sm font-medium">Join thousands who are taking control of their digital footprint</span>
          </div>
        </div>
      </div>
    </div>
  );
};
