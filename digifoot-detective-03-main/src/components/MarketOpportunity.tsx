
import React from 'react';
import { TrendingUp, Users, DollarSign, Shield, Globe, Brain, Target, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function MarketOpportunity() {
  const marketStats = [
    { 
      title: 'Global Cybersecurity Market', 
      value: '$345.4B', 
      growth: '+12.1% CAGR',
      icon: <Shield className="text-green-500" />
    },
    { 
      title: 'Identity Monitoring Market', 
      value: '$15.8B', 
      growth: '+18.2% CAGR',
      icon: <Users className="text-blue-500" />
    },
    { 
      title: 'Privacy Management Tools', 
      value: '$8.2B', 
      growth: '+22.5% CAGR',
      icon: <Globe className="text-purple-500" />
    },
    { 
      title: 'Data Breach Costs (Average)', 
      value: '$4.88M', 
      growth: '+10% YoY',
      icon: <DollarSign className="text-red-500" />
    },
  ];

  const opportunities = [
    {
      title: 'Enterprise B2B Solutions',
      description: 'Corporate digital footprint monitoring for employee security awareness',
      potential: 'High',
      timeline: '6-12 months',
      icon: <Target className="text-green-500" />
    },
    {
      title: 'Consumer Privacy Services',
      description: 'Subscription-based personal digital footprint management',
      potential: 'Medium',
      timeline: '3-6 months',
      icon: <Users className="text-blue-500" />
    },
    {
      title: 'API Monetization',
      description: 'White-label API services for other security platforms',
      potential: 'High',
      timeline: '9-15 months',
      icon: <Zap className="text-yellow-500" />
    },
    {
      title: 'AI-Powered Insights',
      description: 'Machine learning for predictive threat analysis',
      potential: 'Very High',
      timeline: '12-18 months',
      icon: <Brain className="text-purple-500" />
    },
  ];

  const competitiveAdvantages = [
    'Real-time dark web monitoring capabilities',
    'Comprehensive multi-platform username tracking',
    'User-friendly interface with immediate results',
    'Cost-effective compared to enterprise solutions',
    'Scalable cloud-native architecture',
    'Privacy-first approach with data minimization',
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="cyber-heading flex items-center gap-2">
            <TrendingUp className="text-neon-blue" size={24} />
            Market Size & Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded border border-white/10">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <h3 className="font-bold text-xl text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className="text-xs text-green-400">{stat.growth}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-500/10 rounded border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <strong>Key Insight:</strong> The digital identity protection market is experiencing unprecedented growth 
              as data breaches increase by 68% year-over-year and consumers become more privacy-conscious.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="cyber-heading flex items-center gap-2">
            <Target className="text-neon-blue" size={24} />
            Revenue Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded border border-white/10">
                {opp.icon}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{opp.title}</h4>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        opp.potential === 'Very High' ? 'bg-green-500/20 text-green-400' :
                        opp.potential === 'High' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {opp.potential}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{opp.description}</p>
                  <p className="text-xs text-gray-500">Timeline: {opp.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="cyber-heading flex items-center gap-2">
            <Shield className="text-neon-blue" size={24} />
            Competitive Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="flex items-center gap-2 p-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                <span className="text-sm text-gray-300">{advantage}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-500/10 rounded border border-green-500/20">
            <p className="text-sm text-green-300">
              <strong>Strategic Position:</strong> DigiFoot Detective fills the gap between expensive enterprise 
              solutions ($10K-$100K annually) and basic consumer tools, targeting the underserved SMB and 
              prosumer markets with enterprise-grade capabilities at accessible pricing.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
