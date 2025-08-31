
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, AlertTriangle, Search, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DarkWebPresenceProps = {
  found?: boolean; 
  sources?: string[];
  username: string;
  email?: string;
  className?: string;
};

export const DarkWebPresence: React.FC<DarkWebPresenceProps> = ({ 
  found: initialFound, 
  sources: initialSources,
  username,
  email,
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState(initialFound || false);
  const [sources, setSources] = useState<string[]>(initialSources || []);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [limitation, setLimitation] = useState<string>("");

  useEffect(() => {
    if (initialFound !== undefined && initialSources !== undefined) {
      setFound(initialFound);
      setSources(initialSources);
      setIsLoading(false);
      return;
    }

    const checkDarkWeb = async () => {
      setError(null);
      
      try {
        // Determine if username looks like an email
        const inputEmail = username.includes('@') ? username : email;
        
        // Use the dark-web-monitor edge function
        const { data, error } = await supabase.functions.invoke("dark-web-monitor", {
          body: { 
            username,
            email: inputEmail
          },
        });

        if (error) {
          console.error("Error checking dark web:", error);
          setError("Failed to perform dark web analysis. Please try again later.");
          setIsLoading(false);
          return;
        }

        console.log("Dark web analysis results:", data);
        setFound(data.found || false);
        setSources(data.sources || []);
        setRiskFactors(data.riskFactors || []);
        setLimitation(data.limitation || "");
      } catch (error) {
        console.error("Error in dark web analysis:", error);
        setError("An unexpected error occurred during the analysis.");
      } finally {
        setIsLoading(false);
      }
    };

    checkDarkWeb();
  }, [username, email, initialFound, initialSources]);

  return (
    <Card className={`glass-card my-6 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Eye size={20} className="text-neon-blue"/>{" "}Dark Web Analysis
          <Badge variant="outline" className="ml-auto text-xs">
            Basic scan
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-muted-foreground flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            <span>Analyzing risk factors...</span>
          </div>
        ) : error ? (
          <div className="text-destructive flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-green-500 mb-3">
              <Search size={16} /> No direct dark web presence detected
            </div>
            
            {riskFactors.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Info size={14} /> Risk Factors Identified:
                </div>
                <ul className="ml-5 list-disc text-sm space-y-1">
                  {riskFactors.map((factor, index) => (
                    <li key={index} className="text-orange-600">{factor}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-muted/30 p-3 rounded text-xs">
              <p className="font-medium mb-1">Important Note:</p>
              <p className="text-muted-foreground">
                {limitation || "Real dark web monitoring requires specialized enterprise services that are not freely available. This analysis provides basic risk assessment based on observable patterns."}
              </p>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              <p><strong>For comprehensive dark web monitoring, consider:</strong></p>
              <ul className="list-disc ml-5 mt-1">
                <li>Identity monitoring services (LifeLock, Experian)</li>
                <li>Credit monitoring</li>
                <li>Regular security audits</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
