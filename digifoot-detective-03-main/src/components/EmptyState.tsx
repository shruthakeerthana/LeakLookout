
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EmptyState = ({ onQuickSearch }: { onQuickSearch?: (username: string) => void }) => {
  const exampleUsernames = [
    { name: "techGuru42", level: "high", description: "Tech influencer" },
    { name: "crypto_whale", level: "high", description: "Cryptocurrency enthusiast" },
    { name: "digital_nomad", level: "medium", description: "Travel blogger" },
    { name: "gaming_legend", level: "medium", description: "Professional gamer" },
    { name: "photo_wizard", level: "low", description: "Photography hobbyist" }
  ];

  return (
    <Card className="glass-card animate-fade-in mt-8 max-w-md mx-auto">
      <CardContent className="pt-6 pb-8 text-center">
        <h2 className="text-xl font-bold mb-4">Demo Examples:</h2>
        <div className="space-y-3 text-left mx-auto">
          {exampleUsernames.map((username) => (
            <div 
              key={username.name} 
              className="p-3 rounded-lg border border-primary/20 hover:border-primary/40 transition-all bg-card/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-exposure-${username.level}`}></div>
                    <span className="font-medium">{username.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-5">{username.description}</p>
                </div>
                {onQuickSearch && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onQuickSearch(username.name)}
                    className="text-xs"
                  >
                    Try
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Click 'Try' to see a simulated digital footprint analysis for these example profiles.
        </p>
      </CardContent>
    </Card>
  );
};
