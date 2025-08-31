
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Demo breach data for specific examples
const getDemoBreaches = (email: string) => {
  const emailLower = email.toLowerCase();
  
  if (emailLower.includes('techguru42')) {
    return [
      {
        name: "LinkedIn",
        domain: "linkedin.com",
        breachDate: "2021-06-22",
        addedDate: "2021-06-24",
        description: "Data breach exposing professional information and contact details.",
        dataClasses: ["Emails", "Passwords", "Phone Numbers", "Employment Information"],
        isVerified: true,
        isFabricated: false,
        isSensitive: false,
        isRetired: false,
        isSpamList: false,
        logoPath: "/logos/linkedin.png",
        source: "HIBP"
      },
      {
        name: "GitHub",
        domain: "github.com", 
        breachDate: "2022-01-15",
        addedDate: "2022-01-17",
        description: "Exposure of private repositories and access tokens.",
        dataClasses: ["Emails", "Access Tokens", "Repository Data"],
        isVerified: true,
        isFabricated: false,
        isSensitive: true,
        isRetired: false,
        isSpamList: false,
        logoPath: "/logos/github.png",
        source: "XON"
      }
    ];
  }
  
  if (emailLower.includes('crypto_whale')) {
    return [
      {
        name: "Blockchain Exchange",
        domain: "blockchainsecure.com",
        breachDate: "2023-03-10", 
        addedDate: "2023-03-12",
        description: "Major cryptocurrency exchange breach exposing user wallets and transaction history.",
        dataClasses: ["Emails", "Passwords", "Wallet Addresses", "Transaction History"],
        isVerified: true,
        isFabricated: false,
        isSensitive: true,
        isRetired: false,
        isSpamList: false,
        logoPath: "/logos/blockchain.png",
        source: "HIBP"
      }
    ];
  }
  
  return [];
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
    
    // Check if this is a demo example
    const demoBreaches = getDemoBreaches(email);
    
    if (demoBreaches.length > 0) {
      return new Response(
        JSON.stringify({
          breaches: demoBreaches,
          note: "Demo data showing potential breach information.",
          requiresAPIKey: false
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // For non-demo examples, return no breaches
    return new Response(
      JSON.stringify({
        breaches: [],
        note: "To check real breach data, you need a HaveIBeenPwned API key. Without it, we cannot access actual breach information.",
        requiresAPIKey: true
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in hibp-check function:", error);
    
    return new Response(
      JSON.stringify({ 
        breaches: [],
        error: `API Error: ${error.message}`,
        requiresAPIKey: true
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
