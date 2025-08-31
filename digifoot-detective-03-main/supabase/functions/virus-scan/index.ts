
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VIRUSTOTAL_API_KEY = Deno.env.get("VIRUSTOTAL_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Scanning URL with VirusTotal: ${url}`);
    
    if (!VIRUSTOTAL_API_KEY) {
      return new Response(
        JSON.stringify({ error: "VirusTotal API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // First, we need to get the URL ID by sending the URL to VirusTotal
    const urlId = btoa(url).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    
    try {
      // Try to get the report first (in case URL was already analyzed)
      const reportResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
        method: "GET",
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
          "Content-Type": "application/json"
        }
      });
      
      // If the URL hasn't been analyzed yet, submit it
      if (reportResponse.status === 404) {
        const formData = new FormData();
        formData.append("url", url);
        
        const submitResponse = await fetch("https://www.virustotal.com/api/v3/urls", {
          method: "POST",
          headers: {
            "x-apikey": VIRUSTOTAL_API_KEY
          },
          body: formData
        });
        
        if (!submitResponse.ok) {
          const errorData = await submitResponse.json();
          console.error("Error submitting URL to VirusTotal:", errorData);
          return new Response(
            JSON.stringify({ error: "Failed to submit URL to VirusTotal", details: errorData }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Wait a bit for analysis to complete
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Try getting the report again
        const analysisResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
          method: "GET",
          headers: {
            "x-apikey": VIRUSTOTAL_API_KEY,
            "Content-Type": "application/json"
          }
        });
        
        if (!analysisResponse.ok) {
          return new Response(
            JSON.stringify({ verdict: "unknown", error: "Analysis in progress, please try again later" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const analysisData = await analysisResponse.json();
        return processVirusTotalResponse(analysisData, url, corsHeaders);
      }
      
      // If the report was found, process it
      if (reportResponse.ok) {
        const data = await reportResponse.json();
        return processVirusTotalResponse(data, url, corsHeaders);
      } else {
        console.error("Error getting report from VirusTotal:", await reportResponse.text());
        return new Response(
          JSON.stringify({ verdict: "unknown", error: "Failed to get analysis from VirusTotal" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      console.error("Error in VirusTotal request:", error);
      return new Response(
        JSON.stringify({ verdict: "unknown", error: "VirusTotal request failed: " + error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in virus-scan function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function processVirusTotalResponse(data, url, corsHeaders) {
  try {
    // Extract the last analysis stats
    const lastAnalysisStats = data?.data?.attributes?.last_analysis_stats;
    const categories = data?.data?.attributes?.categories || {};
    
    if (!lastAnalysisStats) {
      return new Response(
        JSON.stringify({ verdict: "unknown", url, error: "No analysis data available" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Determine the verdict based on the analysis stats
    let verdict = "clean";
    if (lastAnalysisStats.malicious > 0) {
      verdict = lastAnalysisStats.malicious >= 3 ? "malicious" : "suspicious";
    } else if (lastAnalysisStats.suspicious > 0) {
      verdict = "suspicious";
    }
    
    // Format categories as array
    const categoryList = Object.values(categories);
    
    return new Response(
      JSON.stringify({ 
        verdict,
        categories: categoryList,
        url,
        stats: lastAnalysisStats
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing VirusTotal response:", error);
    return new Response(
      JSON.stringify({ verdict: "unknown", url, error: "Failed to process VirusTotal response" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
