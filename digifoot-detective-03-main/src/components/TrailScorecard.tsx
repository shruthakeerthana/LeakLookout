
import React from "react";
import { BarChart2, Trophy, Award, Star } from "lucide-react";

type Props = {
  score: number;
  suggestions: string[];
  className?: string;
};

export const TrailScorecard: React.FC<Props> = ({ score, suggestions, className = "" }) => {
  // Calculate achievements based on score
  const achievements = [
    { name: "Digital Ghost", unlocked: score < 30, icon: <Trophy size={16} className="text-yellow-500" /> },
    { name: "Privacy Guardian", unlocked: score < 50, icon: <Award size={16} className="text-blue-500" /> },
    { name: "Security Expert", unlocked: score < 70, icon: <Star size={16} className="text-purple-500" /> },
  ];
  
  return (
    <section className={`glass-card my-8 p-4 bg-gradient-to-br from-accent/30 to-primary/10 ${className}`}>
      <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
        <BarChart2 size={20}/> Digital Footprint Scorecard
      </h3>
      <div className="font-mono text-3xl mb-4 flex items-center gap-2">
        <span>{score} / 100</span>
        <div className="text-sm font-normal bg-primary/20 px-2 py-1 rounded">
          {score < 30 ? "Master" : score < 60 ? "Advanced" : "Novice"}
        </div>
      </div>
      
      {/* Achievements Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
          <Trophy size={14} className="text-yellow-500" /> Achievements
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((achievement, i) => (
            <div 
              key={i} 
              className={`p-2 rounded-md text-xs flex flex-col items-center justify-center text-center gap-1 ${
                achievement.unlocked 
                  ? "bg-primary/20 border border-primary/40" 
                  : "bg-secondary/10 text-muted-foreground opacity-50"
              }`}
            >
              {achievement.icon}
              <span>{achievement.name}</span>
              <span className="text-[10px] text-muted-foreground">
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <h4 className="text-sm font-semibold mb-2">Improvement Tasks:</h4>
      <ul className="list-disc ml-4">
        {suggestions.map((s, i) => (
          <li key={i} className="text-sm flex items-start gap-1">
            <input type="checkbox" className="mt-1" /> 
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
