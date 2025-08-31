
import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { lookupVirusTotal } from '@/lib/virusTotal';
import { VirusTotalAnalysis } from './VirusTotalAnalysis';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VirusTotalSectionProps {
  initialUrl?: string;
}

export function VirusTotalSection({ initialUrl }: VirusTotalSectionProps) {
  const [url, setUrl] = useState(initialUrl || '');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setHasScanned(true);
    
    try {
      const result = await lookupVirusTotal(url);
      setAnalysis(result);
    } catch (error) {
      console.error('VirusTotal scan error:', error);
      setAnalysis({ verdict: 'unknown', error: 'Failed to scan URL' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUrl) {
      handleScan();
    }
  }, [initialUrl]);

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'malicious':
        return <ShieldAlert className="h-5 w-5 text-red-500" />;
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'clean':
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'malicious':
        return 'text-red-500';
      case 'suspicious':
        return 'text-yellow-500';
      case 'clean':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="cyber-heading flex items-center gap-2">
          <Shield className="text-neon-blue" size={24} />
          VirusTotal URL Scanner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter URL to scan (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            />
            <Button 
              onClick={handleScan} 
              disabled={loading || !url.trim()}
              className="neon-button"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              {loading ? 'Scanning...' : 'Scan'}
            </Button>
          </div>

          {hasScanned && analysis && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getVerdictIcon(analysis.verdict)}
                <span className={`font-semibold ${getVerdictColor(analysis.verdict)}`}>
                  {analysis.verdict.charAt(0).toUpperCase() + analysis.verdict.slice(1)}
                </span>
              </div>

              <VirusTotalAnalysis analysis={analysis} value={url} />

              {analysis.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-red-500 font-bold">{analysis.stats.malicious || 0}</div>
                    <div className="text-gray-400">Malicious</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold">{analysis.stats.suspicious || 0}</div>
                    <div className="text-gray-400">Suspicious</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-500 font-bold">{analysis.stats.harmless || 0}</div>
                    <div className="text-gray-400">Clean</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500 font-bold">{analysis.stats.undetected || 0}</div>
                    <div className="text-gray-400">Undetected</div>
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 flex items-center gap-1">
                <ExternalLink size={12} />
                <span>Powered by VirusTotal API</span>
              </div>
            </div>
          )}

          {!hasScanned && (
            <div className="text-center text-gray-400 py-4">
              Enter a URL above to check its reputation with VirusTotal
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
