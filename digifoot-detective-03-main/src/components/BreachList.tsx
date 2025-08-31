
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breach } from "@/types";
import { format } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CircleX, ExternalLink, Shield } from "lucide-react";

interface BreachListProps {
  breaches: Breach[];
}

const sourceBadgeStyle = {
  "HIBP": "bg-orange-500/30 text-orange-500 border-orange-500/30",
  "DeHashed": "bg-accent/30 text-accent border-accent/30",
  "Enzoic": "bg-indigo-600/30 text-indigo-600 border-indigo-600/30",
  "Mock": "bg-slate-500/30 text-slate-500 border-slate-500/30",
  "XON": "bg-orange-500/30 text-orange-500 border-orange-500/30"
};

export const BreachList: React.FC<BreachListProps> = ({ breaches }) => {
  if (breaches.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Data Breaches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <Shield className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-center text-muted-foreground">No known data breaches found for this email.</p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Regularly check your email for breaches to stay secure.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Data Breaches ({breaches.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {breaches.map((breach, index) => (
            <AccordionItem key={breach.name + (breach.source ?? "")} value={`breach-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                    <CircleX className="w-5 h-5 text-exposure-high" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      {breach.name}
                      {breach.source && (
                        <span className={`ml-1 px-2 py-0.5 text-xs rounded border ${
                          sourceBadgeStyle[breach.source as keyof typeof sourceBadgeStyle] || 
                          sourceBadgeStyle.Mock
                        }`}>
                          {breach.source}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Breached on {format(new Date(breach.breachDate), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-2">
                <p>{breach.description}</p>
                <div>
                  <h4 className="font-medium mb-1">Compromised data:</h4>
                  <div className="flex flex-wrap gap-1">
                    {breach.dataClasses.map((dataClass) => (
                      <Badge key={dataClass} variant="secondary">{dataClass}</Badge>
                    ))}
                  </div>
                </div>
                {breach.domain && (
                  <div>
                    <h4 className="font-medium mb-1">Website:</h4>
                    <a 
                      href={`https://${breach.domain}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {breach.domain} <ExternalLink size={14} />
                    </a>
                  </div>
                )}
                <div className="pt-2 text-xs text-muted-foreground border-t border-border mt-2">
                  <p>Source: {breach.source || "Unknown"}</p>
                  <p>Added to database: {format(new Date(breach.addedDate), "MMM d, yyyy")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
