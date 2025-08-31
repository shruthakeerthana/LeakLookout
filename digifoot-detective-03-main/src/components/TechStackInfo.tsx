
import React from 'react';
import { Code, Database, Globe, Shield, Zap, Cloud, Brain, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function TechStackInfo() {
  const frontendTech = [
    { name: 'React 18', description: 'Modern UI framework with hooks', icon: <Code className="text-blue-500" /> },
    { name: 'TypeScript', description: 'Type-safe JavaScript', icon: <Code className="text-blue-600" /> },
    { name: 'Vite', description: 'Fast build tool and dev server', icon: <Zap className="text-yellow-500" /> },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: <Globe className="text-cyan-500" /> },
    { name: 'Shadcn/UI', description: 'Beautiful accessible components', icon: <Globe className="text-gray-600" /> },
    { name: 'React Router', description: 'Client-side routing', icon: <Globe className="text-orange-500" /> },
    { name: 'React Query', description: 'Data fetching and caching', icon: <Database className="text-green-500" /> },
    { name: 'Lucide Icons', description: 'Beautiful icon library', icon: <Globe className="text-purple-500" /> },
  ];

  const backendTech = [
    { name: 'Supabase', description: 'Backend-as-a-Service platform', icon: <Database className="text-green-600" /> },
    { name: 'PostgreSQL', description: 'Relational database', icon: <Database className="text-blue-700" /> },
    { name: 'Edge Functions', description: 'Serverless functions on Deno', icon: <Cloud className="text-green-500" /> },
    { name: 'Row Level Security', description: 'Database-level security', icon: <Shield className="text-red-500" /> },
    { name: 'Real-time subscriptions', description: 'Live data updates', icon: <Zap className="text-yellow-600" /> },
    { name: 'Authentication', description: 'User management system', icon: <Shield className="text-blue-500" /> },
  ];

  const apis = [
    { name: 'VirusTotal API', description: 'URL/file reputation scanning', icon: <Shield className="text-red-500" /> },
    { name: 'HaveIBeenPwned API', description: 'Data breach checking', icon: <Shield className="text-orange-500" /> },
    { name: 'Sherlock Project', description: 'Username enumeration', icon: <Globe className="text-purple-500" /> },
    { name: 'IPInfo API', description: 'IP geolocation data', icon: <Globe className="text-blue-500" /> },
    { name: 'Dicebear API', description: 'Avatar generation', icon: <Globe className="text-green-500" /> },
    { name: 'Custom Dark Web Monitor', description: 'Simulated dark web scanning', icon: <Shield className="text-gray-700" /> },
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="cyber-heading flex items-center gap-2">
            <Code className="text-neon-blue" size={24} />
            Frontend Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frontendTech.map((tech, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded border border-white/10">
                {tech.icon}
                <div>
                  <h4 className="font-semibold text-white">{tech.name}</h4>
                  <p className="text-sm text-gray-400">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="cyber-heading flex items-center gap-2">
            <Database className="text-neon-blue" size={24} />
            Backend Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backendTech.map((tech, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded border border-white/10">
                {tech.icon}
                <div>
                  <h4 className="font-semibold text-white">{tech.name}</h4>
                  <p className="text-sm text-gray-400">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="cyber-heading flex items-center gap-2">
            <Globe className="text-neon-blue" size={24} />
            External APIs & Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apis.map((api, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded border border-white/10">
                {api.icon}
                <div>
                  <h4 className="font-semibold text-white">{api.name}</h4>
                  <p className="text-sm text-gray-400">{api.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
