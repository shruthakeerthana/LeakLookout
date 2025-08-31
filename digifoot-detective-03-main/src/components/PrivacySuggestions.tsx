
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

interface PrivacySuggestionsProps {
  suggestions: string[];
  level: "low" | "medium" | "high";
}

export const PrivacySuggestions: React.FC<PrivacySuggestionsProps> = ({ suggestions, level }) => {
  // Header text based on exposure level
  const headers = {
    low: "Privacy Recommendations",
    medium: "Privacy Recommendations",
    high: "Critical Privacy Actions"
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{headers[level]}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CircleCheck className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base">{suggestion}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
