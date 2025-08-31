
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, Trophy, Award, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ExposureScoreProps {
  score: number;
  level: "low" | "medium" | "high";
}

export const ExposureScore: React.FC<ExposureScoreProps> = ({ score, level }) => {
  // Determine color based on exposure level
  const colorMap = {
    low: "bg-exposure-low",
    medium: "bg-exposure-medium",
    high: "bg-exposure-high"
  };

  const labelMap = {
    low: "Low Exposure",
    medium: "Medium Exposure",
    high: "High Exposure"
  };

  const indicatorColor = colorMap[level];
  const labelText = labelMap[level];

  // Calculate security level and remaining XP to next level
  const securityLevel = Math.max(1, Math.floor((100 - score) / 20));
  const xpCurrent = (100 - score) % 20;
  const xpToNextLevel = 20;
  const xpPercentage = (xpCurrent / xpToNextLevel) * 100;

  return (
    <Card className="glass-card overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 z-0" />
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital Security</span>
          <div className="flex items-center">
            <span className={`exposure-badge ${level === 'low' ? 'exposure-badge-low' : level === 'medium' ? 'exposure-badge-medium' : 'exposure-badge-high'} shadow-lg`}>
              {labelMap[level]}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-48 h-48">
            <div className={`absolute inset-0 rounded-full flex flex-col items-center justify-center animate-pulse-scale ${level === 'low' ? 'text-exposure-low' : level === 'medium' ? 'text-exposure-medium' : 'text-exposure-high'} bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/20`}>
              <div className="text-4xl font-bold">{score}/100</div>
              <div className="flex items-center gap-2 mt-2">
                <Award className="text-yellow-500 fill-yellow-500" size={24} />
                <span className="text-xl font-bold text-white">Level {securityLevel}</span>
              </div>
            </div>
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                className="text-primary/10"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke={level === 'low' ? '#4ade80' : level === 'medium' ? '#fbbf24' : '#ef4444'}
                strokeWidth="16"
                strokeDasharray={`${(score / 100) * 552.92} 552.92`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">XP to Level {securityLevel + 1}</span>
            <span className="text-xs font-medium">{xpCurrent}/{xpToNextLevel} XP</span>
          </div>
          <Progress value={xpPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/10 transition-transform hover:scale-105">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Circle className="w-3 h-3 fill-exposure-low text-exposure-low" />
              <span className="text-sm font-medium">Low</span>
            </div>
            <span className="text-xs text-muted-foreground">0-33</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/10 transition-transform hover:scale-105">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Circle className="w-3 h-3 fill-exposure-medium text-exposure-medium" />
              <span className="text-sm font-medium">Medium</span>
            </div>
            <span className="text-xs text-muted-foreground">34-66</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/10 transition-transform hover:scale-105">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Circle className="w-3 h-3 fill-exposure-high text-exposure-high" />
              <span className="text-sm font-medium">High</span>
            </div>
            <span className="text-xs text-muted-foreground">67-100</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
