
import { supabase } from "@/integrations/supabase/client";

/**
 * Query VirusTotal for URL or domain reputation/analysis using our Supabase Edge Function
 */
export async function lookupVirusTotal(input: string): Promise<
  { verdict: "malicious" | "suspicious" | "clean" | "unknown"; categories?: string[]; stats?: any; error?: string }
> {
  // Simple URL/domain test
  const urlPattern = /^(https?:\/\/)?([\w\-\.]+\.[a-z]{2,})(\/[^\s]*)?$/i;
  const domainMatch = input.match(urlPattern);
  if (!domainMatch) {
    return { verdict: "unknown" };
  }

  // VirusTotal API expects URL in proper format, so ensure protocol
  const asUrl = input.startsWith("http") ? input : `http://${input}`;
  
  try {
    // Call our Supabase Edge Function
    const { data, error } = await supabase.functions.invoke("virus-scan", {
      body: { url: asUrl },
    });

    if (error) {
      console.error("Error scanning URL:", error);
      return { verdict: "unknown", error: "Could not scan URL: " + error.message };
    }

    if (!data) {
      return { verdict: "unknown", error: "No data returned from scan" };
    }

    // Return the verdict and categories from the scan
    return { 
      verdict: data.verdict as "malicious" | "suspicious" | "clean" | "unknown", 
      categories: data.categories,
      stats: data.stats,
      error: data.error
    };
  } catch (err) {
    console.error("Error in lookupVirusTotal:", err);
    return { verdict: "unknown", error: "VirusTotal request failed." };
  }
}
