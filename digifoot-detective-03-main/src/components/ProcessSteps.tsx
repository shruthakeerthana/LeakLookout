
import React from 'react';
import { ArrowRight, User, FileSearch, PieChart, Shield } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto glass-card p-6">
      <div className="space-y-8">
        <div className="process-step">
          <div className="step-number">1</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-semibold text-white mb-1">
              <User size={18} className="text-neon-blue" /> Enter your data
            </div>
            <p className="text-gray-400 text-sm">Provide username, email, or other identifiers</p>
          </div>
        </div>
        
        <div className="process-step">
          <div className="step-number">2</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-semibold text-white mb-1">
              <FileSearch size={18} className="text-neon-blue" /> Our engine scans across 100+ sources
            </div>
            <p className="text-gray-400 text-sm">We search social platforms, data breaches, dark web, and more</p>
          </div>
        </div>
        
        <div className="process-step">
          <div className="step-number">3</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-semibold text-white mb-1">
              <PieChart size={18} className="text-neon-blue" /> You get a full exposure report
            </div>
            <p className="text-gray-400 text-sm">Comprehensive analysis of your digital presence</p>
          </div>
        </div>
        
        <div className="process-step">
          <div className="step-number">4</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 font-semibold text-white mb-1">
              <Shield size={18} className="text-neon-blue" /> Get tools to fix and protect it
            </div>
            <p className="text-gray-400 text-sm">Actionable recommendations to secure your online presence</p>
          </div>
        </div>
      </div>
    </div>
  );
};
