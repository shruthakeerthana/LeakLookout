
import { SearchResult, Platform, Breach } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { PLATFORMS } from "./platforms";
import { calculateExposureScore, determineExposureLevel, generateSuggestions } from "./scoreCalculator";
import { generateFallbackSearchResult } from "./fallbackResults";

/**
 * Main search function that checks a username across platforms using the Supabase Edge Function
 */
export const searchUsername = async (username: string): Promise<SearchResult> => {
  console.log(`Searching for username: ${username}`);
  
  try {
    const isEmail = username.includes('@');
    
    // For emails, extract the username part for platform searches
    const searchUsername = isEmail ? username.split('@')[0] : username;
    
    // Call the username search edge function with the cleaned username
    const { data: platformsData, error: platformsError } = await supabase.functions.invoke("search-username", {
      body: { username: searchUsername },
    });

    if (platformsError) throw new Error(`Platform search error: ${platformsError.message}`);

    // Ensure the platforms data exists and has the correct structure
    if (!platformsData || !platformsData.platforms) {
      throw new Error("Invalid data format from search-username function");
    }

    // Get platforms where the username exists, ensuring proper URL formatting
    const platforms: Platform[] = platformsData.platforms.map((p: any) => {
      // Get the platform icon or use a default one
      const platformTemplate = PLATFORMS.find(platform => platform.name.toLowerCase() === p.name.toLowerCase());
      const icon = p.icon || (platformTemplate?.icon || 'circle');
      
      // Ensure the URL uses the correct username format (not email)
      let url = p.url;
      
      // Fix URLs that might have email addresses where they shouldn't
      if (platformTemplate && (url.includes('@') || url.includes('{username}'))) {
        url = platformTemplate.url.replace('{username}', searchUsername);
      }
      
      return {
        name: p.name,
        url: url,
        icon: icon,
        username: searchUsername
      };
    });

    console.log("Found platforms:", platforms);

    // For emails, check for breaches using our HIBP check function
    let breaches: Breach[] = [];
    let breachErrors: string[] = [];
    let requiresAPIKey = false;
    let hibpNote = "";
    
    if (isEmail) {
      const { data: hibpData, error: hibpError } = await supabase.functions.invoke("hibp-check", {
        body: { email: username },
      });

      if (hibpError) {
        throw new Error(`HIBP check error: ${hibpError.message}`);
      }
      
      breaches = hibpData.breaches || [];
      breachErrors = hibpData.error ? [hibpData.error] : [];
      requiresAPIKey = hibpData.requiresAPIKey || false;
      hibpNote = hibpData.note || "";
      
      if (breachErrors?.length > 0) {
        console.warn("HIBP check warnings:", breachErrors);
      }
    }

    // Check dark web presence
    const { data: darkWebData, error: darkWebError } = await supabase.functions.invoke("dark-web-monitor", {
      body: { 
        username: searchUsername, 
        email: isEmail ? username : undefined 
      },
    });

    if (darkWebError) throw new Error(`Dark web scan error: ${darkWebError.message}`);

    // Calculate exposure score based on actual findings and realistic risk assessment
    const platformCount = platforms.length;
    const breachCount = breaches.length;
    const darkWebFound = darkWebData.found;
    
    // Calculate high-risk platforms more accurately
    const highRiskPlatformNames = ["facebook", "instagram", "twitter", "linkedin", "tiktok", "reddit", "snapchat"];
    const highRiskPlatforms = platforms.filter(p => 
      highRiskPlatformNames.includes(p.icon.toLowerCase())
    ).length;
    
    const exposureScore = calculateExposureScore({
      platformCount,
      breachCount,
      darkWebFound,
      highRiskPlatforms,
      username: searchUsername
    });
    
    // Determine exposure level
    const exposureLevel = determineExposureLevel(exposureScore);
    
    // Generate realistic suggestions based on findings
    const suggestions = generateSuggestions(platformCount, breachCount, darkWebFound);
    
    return {
      input: username,
      inputType: isEmail ? 'email' : 'username',
      platforms,
      breaches,
      exposureScore,
      exposureLevel,
      suggestions,
      requiresAPIKey,
      hibpNote
    };
  } catch (error) {
    console.error("Error in searchUsername:", error);
    
    // Fallback to mock data if the API calls fail
    return generateFallbackSearchResult(username);
  }
};
