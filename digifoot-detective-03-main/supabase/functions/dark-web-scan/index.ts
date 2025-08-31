
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
    const { username, email } = await req.json();
    
    // Get the input to scan - prioritize email if provided
    const scanInput = email || username;

    if (!scanInput) {
      return new Response(
        JSON.stringify({ error: "Username or email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Scanning dark web for: ${scanInput}`);
    
    // Check if input is an email
    const isEmail = scanInput.includes('@');
    
    // In a real implementation, we would use a Dark Web monitoring API
    // For demonstration, we'll simulate more realistic behavior based on input type
    
    // Emails have higher chance of being found on dark web than usernames
    const foundProbability = isEmail ? 0.6 : 0.3;
    const found = Math.random() < foundProbability;
    
    // More sources for emails
    const possibleSources = [
      'Pastebin data dump (2022)',
      'IRC chat logs',
      'Database leak compilation',
      'Breached forum data',
      'Data broker listings',
      'Compromised credential database'
    ];
    
    let sources = [];
    
    if (found) {
      // For emails, include more sources
      const sourceCount = isEmail ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 2) + 1;
      
      // Shuffle and take a subset of sources
      sources = [...possibleSources]
        .sort(() => Math.random() - 0.5)
        .slice(0, sourceCount);
    }

    return new Response(
      JSON.stringify({ found, sources }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in dark-web-scan function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
