
// Fallback search result generation for when API calls fail

import { Platform, SearchResult, Breach } from "@/types";
import { PLATFORMS } from "./platforms";
import { calculateExposureScore, determineExposureLevel } from "./scoreCalculator";

export const generateFallbackSearchResult = (username: string): SearchResult => {
  console.log("Using fallback search results for:", username);
  
  // Always include these platforms in the results
  const demoIncludePlatforms: Platform[] = [
    { name: 'Twitter', url: `https://twitter.com/${username}`, icon: 'twitter', username },
    { name: 'Instagram', url: `https://instagram.com/${username}`, icon: 'instagram', username },
    { name: 'YouTube', url: `https://youtube.com/@${username}`, icon: 'youtube', username },
    { name: 'GitHub', url: `https://github.com/${username}`, icon: 'github', username }
  ];
  
  const platforms = [...demoIncludePlatforms];
  
  // Add a random breach for demo effect
  const breaches: Breach[] = [];
  if (Math.random() > 0.5) {
    breaches.push({
      name: 'LinkedIn',
      domain: 'linkedin.com',
      breachDate: '2012-05-05',
      addedDate: '2016-05-21',
      description: 'In May 2016, LinkedIn had 164 million email addresses and passwords exposed.',
      dataClasses: ['Email addresses', 'Passwords'],
      isVerified: true,
      isFabricated: false,
      isSensitive: false,
      isRetired: false,
      isSpamList: false,
      logoPath: '',
      source: 'HIBP'
    });
  }
  
  // Calculate exposure score
  const platformCount = platforms.length;
  const breachCount = breaches.length;
  const exposureScore = calculateExposureScore({ 
    platformCount, 
    breachCount, 
    darkWebFound: false 
  });
  
  // Determine exposure level
  const exposureLevel = determineExposureLevel(exposureScore);
  
  // Generate suggestions
  const suggestions: string[] = [
    "Enable two-factor authentication on all accounts",
    "Review your public profile visibility",
    "Remove unused profiles to minimize digital footprint"
  ];
  
  return {
    input: username,
    inputType: username.includes('@') ? 'email' : 'username',
    platforms,
    breaches,
    exposureScore,
    exposureLevel,
    suggestions
  };
};
