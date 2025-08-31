
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldX, ShieldCheck, AlertTriangle, Shield } from "lucide-react";

type Analysis = {
  verdict: "malicious" | "suspicious" | "clean" | "unknown";
  categories?: string[];
  stats?: {
    harmless?: number;
    malicious?: number;
    suspicious?: number;
    undetected?: number;
  };
  error?: string;
};

export function VirusTotalAnalysis({ analysis, value }: { analysis?: Analysis; value: string }) {
  if (!analysis) return null;
  if (analysis.error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <Shield className="h-5 w-5 text-destructive" />
        <AlertTitle>VirusTotal scan unavailable</AlertTitle>
        <AlertDescription>
          {analysis.error}
        </AlertDescription>
      </Alert>
    );
  }

  if (analysis.verdict === "malicious" || analysis.verdict === "suspicious") {
    return (
      <Alert variant="destructive" className="mb-4">
        <ShieldX className="h-5 w-5 text-destructive" />
        <AlertTitle>
          Detected {analysis.verdict === "malicious" ? "Malicious" : "Suspicious"} Link
        </AlertTitle>
        <AlertDescription>
          <p>The link <span className="font-mono px-1 rounded bg-destructive/10">{value}</span> showed <strong>{analysis.verdict}</strong> indicators in VirusTotal.</p>
          
          {analysis.stats && (
            <div className="mt-2 text-sm">
              <p>
                <span className="font-semibold">Detection Stats:</span> 
                <span className="ml-1 text-red-500">{analysis.stats.malicious || 0} malicious</span>, 
                <span className="ml-1 text-yellow-500">{analysis.stats.suspicious || 0} suspicious</span>, 
                <span className="ml-1 text-green-500">{analysis.stats.harmless || 0} harmless</span>, 
                <span className="ml-1 text-gray-500">{analysis.stats.undetected || 0} undetected</span>
              </p>
            </div>
          )}
          
          {analysis.categories && analysis.categories.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold">Categories:</span>{" "}
              {analysis.categories.map((c, i) => (
                <span key={i} className="inline-block mr-1 mb-1 bg-destructive/10 px-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (analysis.verdict === "clean") {
    return (
      <Alert className="mb-4">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertTitle>VirusTotal: No dangers detected</AlertTitle>
        <AlertDescription>
          <p>The link <span className="font-mono px-1 rounded bg-green-200/20">{value}</span> appears clean.</p>
          
          {analysis.stats && (
            <div className="mt-2 text-sm">
              <p>
                <span className="font-semibold">Detection Stats:</span> 
                <span className="ml-1 text-red-500">{analysis.stats.malicious || 0} malicious</span>, 
                <span className="ml-1 text-yellow-500">{analysis.stats.suspicious || 0} suspicious</span>, 
                <span className="ml-1 text-green-500">{analysis.stats.harmless || 0} harmless</span>, 
                <span className="ml-1 text-gray-500">{analysis.stats.undetected || 0} undetected</span>
              </p>
            </div>
          )}
          
          {analysis.categories && analysis.categories.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold">Categories:</span>{" "}
              {analysis.categories.map((c, i) => (
                <span key={i} className="inline-block mr-1 mb-1 bg-primary/10 px-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }
  // verdict == unknown
  return null;
}
