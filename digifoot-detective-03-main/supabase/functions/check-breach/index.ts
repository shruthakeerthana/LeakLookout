
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Checking breaches for email: ${email}`);
    
    let breaches = [];
    let errors = [];

    // First try Enzoic if credentials are available
    const enzoicApiKey = Deno.env.get("ENZOIC_API_KEY");
    const enzoicApiSecret = Deno.env.get("ENZOIC_API_SECRET");
    
    if (enzoicApiKey && enzoicApiSecret) {
      try {
        const enzoicBreaches = await checkEnzoicBreaches(email, enzoicApiKey, enzoicApiSecret);
        breaches = breaches.concat(enzoicBreaches);
        console.log(`Enzoic returned ${enzoicBreaches.length} breaches for ${email}`);
      } catch (error) {
        console.error("Enzoic API error:", error);
        errors.push(`Enzoic API error: ${error.message}`);
      }
    } else {
      console.log("No Enzoic API credentials available");
    }
    
    // Then try DeHashed if credentials are available
    const dehashedEmail = Deno.env.get("DEHASHED_EMAIL");
    const dehashedApiKey = Deno.env.get("DEHASHED_API_KEY");
    
    if (dehashedEmail && dehashedApiKey) {
      try {
        const dehashedBreaches = await checkDehashedBreaches(email, dehashedEmail, dehashedApiKey);
        breaches = breaches.concat(dehashedBreaches);
        console.log(`DeHashed returned ${dehashedBreaches.length} breaches for ${email}`);
      } catch (error) {
        console.error("DeHashed API error:", error);
        errors.push(`DeHashed API error: ${error.message}`);
      }
    } else {
      console.log("No DeHashed API credentials available");
    }

    // If no breaches found from either service, or both services failed
    if ((breaches.length === 0) && (errors.length > 0 || (!enzoicApiKey && !dehashedApiKey))) {
      console.log("No breaches found or all APIs failed, using mock data");
      breaches = generateMockBreaches();
    }
    
    // Remove duplicates by breach name
    const uniqueBreaches = removeDuplicateBreaches(breaches);
    
    return new Response(
      JSON.stringify({ 
        breaches: uniqueBreaches,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in check-breach function:", error);
    
    // In case of error, return mock data as fallback
    return new Response(
      JSON.stringify({ 
        breaches: generateMockBreaches(),
        error: `API Error: ${error.message}`
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/**
 * Check breaches using Enzoic API
 */
async function checkEnzoicBreaches(email: string, apiKey: string, apiSecret: string) {
  // Base64 encode the API credentials for Basic Auth
  const authHeader = "Basic " + btoa(`${apiKey}:${apiSecret}`);
  
  // Check if email is exposed
  const exposedResponse = await fetch(`https://api.enzoic.com/v1/accounts/check-by-email?email=${encodeURIComponent(email)}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": authHeader
    }
  });
  
  if (!exposedResponse.ok) {
    throw new Error(`Enzoic exposed check API error: ${exposedResponse.status}`);
  }
  
  const exposedData = await exposedResponse.json();
  
  // If not exposed, return empty array
  if (!exposedData.exposed) {
    return [];
  }
  
  // If exposed, get breach details
  const exposuresResponse = await fetch(`https://api.enzoic.com/v1/accounts/exposures-by-email?email=${encodeURIComponent(email)}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": authHeader
    }
  });
  
  if (!exposuresResponse.ok) {
    throw new Error(`Enzoic exposures API error: ${exposuresResponse.status}`);
  }
  
  const exposuresData = await exposuresResponse.json();
  
  // Transform Enzoic data to our breach format
  return transformEnzoicToBreaches(exposuresData);
}

/**
 * Transform Enzoic API response to our breach format
 */
function transformEnzoicToBreaches(enzoicData: any) {
  if (!enzoicData.exposures || enzoicData.exposures.length === 0) {
    return [];
  }
  
  return enzoicData.exposures.map((exposure: any) => {
    // Map exposure types to our data classes format
    const dataClasses = [];
    if (exposure.exposedData) {
      if (exposure.exposedData.includes("username")) dataClasses.push("Usernames");
      if (exposure.exposedData.includes("email")) dataClasses.push("Email addresses");
      if (exposure.exposedData.includes("password")) dataClasses.push("Passwords");
      if (exposure.exposedData.includes("hash")) dataClasses.push("Password hashes");
      if (exposure.exposedData.includes("name")) dataClasses.push("Names");
      if (exposure.exposedData.includes("phone")) dataClasses.push("Phone numbers");
      if (exposure.exposedData.includes("address")) dataClasses.push("Physical addresses");
      if (exposure.exposedData.includes("ip")) dataClasses.push("IP addresses");
      // Add other categories if needed
    }
    
    // If no specific data classes identified, use a generic one
    if (dataClasses.length === 0) {
      dataClasses.push("Unknown");
    }
    
    return {
      name: exposure.title || "Unknown breach",
      domain: exposure.domain || "unknown.com",
      breachDate: exposure.breachDate || new Date().toISOString().split('T')[0],
      addedDate: exposure.discoveryDate || new Date().toISOString().split('T')[0],
      description: exposure.description || `Data exposed in the ${exposure.title || "Unknown"} breach.`,
      dataClasses,
      isVerified: true,
      isFabricated: false,
      isSensitive: exposure.exposedData?.includes("password") || false,
      isRetired: false,
      isSpamList: false,
      logoPath: "",
      source: "Enzoic"
    };
  });
}

/**
 * Check breaches using DeHashed API
 */
async function checkDehashedBreaches(email: string, dehashedEmail: string, dehashedApiKey: string) {
  // Prepare authentication for DeHashed API
  const authHeader = "Basic " + btoa(`${dehashedEmail}:${dehashedApiKey}`);
  
  // Make request to DeHashed API
  const searchQuery = encodeURIComponent(`email:${email}`);
  const response = await fetch(`https://api.dehashed.com/search?query=${searchQuery}&size=10`, {
    headers: {
      "Accept": "application/json",
      "Authorization": authHeader
    }
  });
  
  if (!response.ok) {
    throw new Error(`DeHashed API error: ${response.status}`);
  }
  
  const dehashedData = await response.json();
  
  // Transform DeHashed data to our breach format
  return transformDehashedToBreaches(dehashedData);
}

/**
 * Transform DeHashed API response to our breach format
 */
function transformDehashedToBreaches(dehashedData: any) {
  if (!dehashedData.entries || dehashedData.entries.length === 0) {
    return [];
  }
  
  // Group entries by database name to consolidate breaches
  const breachesByName = new Map();
  
  for (const entry of dehashedData.entries) {
    if (!entry.database_name) continue;
    
    const name = entry.database_name;
    
    if (!breachesByName.has(name)) {
      breachesByName.set(name, {
        name,
        domain: entry.domain || name.toLowerCase().replace(/\s+/g, "") + ".com",
        breachDate: entry.created_at || "Unknown date",
        addedDate: new Date().toISOString().split('T')[0],
        description: `Data exposed in the ${name} breach.`,
        dataClasses: new Set(),
        isVerified: true,
        isFabricated: false,
        isSensitive: entry.password ? true : false,
        isRetired: false,
        isSpamList: false,
        logoPath: "",
        source: "DeHashed"
      });
    }
    
    // Add exposed data types to the breach
    const breach = breachesByName.get(name);
    if (entry.username) breach.dataClasses.add("Usernames");
    if (entry.email) breach.dataClasses.add("Email addresses");
    if (entry.password) breach.dataClasses.add("Passwords");
    if (entry.hashed_password) breach.dataClasses.add("Password hashes");
    if (entry.name) breach.dataClasses.add("Names");
    if (entry.phone) breach.dataClasses.add("Phone numbers");
    if (entry.address) breach.dataClasses.add("Physical addresses");
    if (entry.ip_address) breach.dataClasses.add("IP addresses");
  }
  
  // Convert Set to Array for each breach's dataClasses
  return Array.from(breachesByName.values()).map(breach => ({
    ...breach,
    dataClasses: Array.from(breach.dataClasses)
  }));
}

/**
 * Remove duplicate breaches based on name
 */
function removeDuplicateBreaches(breaches: any[]) {
  const uniqueBreaches = new Map();
  
  for (const breach of breaches) {
    // If the breach is not in the map yet, or this is a better source (prefer Enzoic over DeHashed)
    if (!uniqueBreaches.has(breach.name) || 
        (breach.source === "Enzoic" && uniqueBreaches.get(breach.name).source !== "Enzoic")) {
      uniqueBreaches.set(breach.name, breach);
    }
  }
  
  return Array.from(uniqueBreaches.values());
}

/**
 * Generate mock breach data if needed
 */
function generateMockBreaches() {
  const mockBreaches = [];
  
  if (Math.random() > 0.6) {
    mockBreaches.push({
      name: "LinkedIn",
      domain: "linkedin.com",
      breachDate: "2012-05-05",
      addedDate: "2016-05-21",
      description: "In May 2016, LinkedIn had 164 million email addresses and passwords exposed.",
      dataClasses: ["Email addresses", "Passwords"],
      isVerified: true,
      isFabricated: false,
      isSensitive: false,
      isRetired: false,
      isSpamList: false,
      logoPath: "",
      source: "Mock"
    });
  }
  
  if (Math.random() > 0.7) {
    mockBreaches.push({
      name: "Adobe",
      domain: "adobe.com",
      breachDate: "2013-10-04",
      addedDate: "2013-12-04",
      description: "In October 2013, 153 million Adobe accounts were breached with their passwords being encrypted but not salted.",
      dataClasses: ["Email addresses", "Passwords", "Usernames"],
      isVerified: true,
      isFabricated: false,
      isSensitive: false,
      isRetired: false,
      isSpamList: false,
      logoPath: "",
      source: "Mock"
    });
  }
  
  return mockBreaches;
}
