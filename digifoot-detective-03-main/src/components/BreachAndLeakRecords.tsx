import React from "react";
import { AlertTriangle, Database, Shield, ExternalLink, Key } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Breach = {
  name: string;
  breachDate: string;
  description?: string;
  dataClasses: string[];
  domain?: string;
  source?: string;
};

type BreachAndLeakRecordsProps = {
  breaches: Breach[];
  requiresAPIKey?: boolean;
  note?: string;
};

const sourceBadgeStyle = {
  "HIBP": "bg-orange-500/30 text-orange-500",
  "DeHashed": "bg-accent/30 text-accent",
  "Enzoic": "bg-indigo-600/30 text-indigo-600",
  "Mock": "bg-slate-500/30 text-slate-500",
  "XON": "bg-orange-500/30 text-orange-500"
};

export const BreachAndLeakRecords: React.FC<BreachAndLeakRecordsProps> = ({ 
  breaches, 
  requiresAPIKey = false,
  note 
}) => (
  <Card className="glass-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-bold flex items-center gap-2">
        <Database size={20} className="text-neon-blue"/> Data Breaches & Leak Records
      </CardTitle>
    </CardHeader>
    <CardContent>
      {requiresAPIKey ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Key className="w-12 h-12 text-orange-500 mb-3" />
          <div className="text-center">
            <p className="font-medium mb-2">API Key Required</p>
            <p className="text-sm text-muted-foreground mb-3">
              {note || "Real breach data requires a HaveIBeenPwned API key."}
            </p>
            <a 
              href="https://haveibeenpwned.com/API/Key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 justify-center text-sm"
            >
              Get HIBP API Key <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ) : breaches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Shield className="w-12 h-12 text-green-500 mb-3" />
          <div className="text-center">
            <p className="font-medium mb-1">No known breaches found</p>
            <p className="text-sm text-muted-foreground">
              Your data hasn't been found in any known data breaches.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-sm text-orange-500 mb-3 flex items-center gap-1">
            <AlertTriangle size={16} />
            <span>Found {breaches.length} breaches containing your information</span>
          </div>
          <ul className="space-y-4">
            {breaches.map((b, idx) => (
              <li key={idx} className="border-l-4 border-exposure-high pl-3 bg-accent/10 rounded p-3">
                <div className="font-semibold flex items-center gap-2 mb-1">
                  <AlertTriangle size={15} className="text-exposure-high" />
                  {b.name} 
                  <span className="text-xs ml-2 opacity-60">({b.breachDate})</span>
                  {b.source && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                      (b.source in sourceBadgeStyle) 
                        ? sourceBadgeStyle[b.source as keyof typeof sourceBadgeStyle]
                        : sourceBadgeStyle.Mock
                    }`}>
                      {b.source}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-2">{b.description}</div>
                {b.domain && (
                  <a 
                    className="text-primary flex items-center gap-1 text-xs mb-2" 
                    href={`https://${b.domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {b.domain} <ExternalLink size={12} />
                  </a>
                )}
                <div className="flex gap-2 flex-wrap">
                  {b.dataClasses.map((dc) => (
                    <span key={dc} className="px-2 py-0.5 bg-exposure-high/20 rounded text-exposure-high text-xs">
                      {dc}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs bg-muted/30 p-3 rounded">
            <p className="font-medium">What to do next:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Change your passwords on affected services</li>
              <li>Enable two-factor authentication where available</li>
              <li>Monitor your accounts for suspicious activity</li>
              <li>Consider using a password manager</li>
            </ul>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);
