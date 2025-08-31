import { SearchResult } from "@/types";

// Mock function to simulate API search results
export function mockSearch(input: string): SearchResult | null {
  const normalized = input.trim().toLowerCase();

  // Add demo examples for pitch presentation
  if (normalized === "techguru42") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Twitter", url: "https://twitter.com/techGuru42", icon: "twitter" },
        { name: "GitHub", url: "https://github.com/techGuru42", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/techGuru42", icon: "linkedin" },
        { name: "YouTube", url: "https://youtube.com/@techGuru42", icon: "youtube" },
        { name: "Medium", url: "https://medium.com/@techGuru42", icon: "medium" },
        { name: "Reddit", url: "https://reddit.com/user/techGuru42", icon: "reddit" },
        { name: "Instagram", url: "https://instagram.com/techGuru42", icon: "instagram" },
      ],
      breaches: [
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
      ],
      exposureScore: 75,
      exposureLevel: "high",
      suggestions: [
        "Implement hardware security keys for critical accounts",
        "Review API tokens and revoke unused access",
        "Consider using separate professional and personal online identities",
        "Set up real-time alerts for account activities"
      ],
    };
  }

  if (normalized === "crypto_whale") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Twitter", url: "https://twitter.com/crypto_whale", icon: "twitter" },
        { name: "Reddit", url: "https://reddit.com/user/crypto_whale", icon: "reddit" },
        { name: "GitHub", url: "https://github.com/crypto_whale", icon: "github" },
        { name: "Discord", url: "#", icon: "discord" },
        { name: "YouTube", url: "https://youtube.com/@crypto_whale", icon: "youtube" },
      ],
      breaches: [
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
      ],
      exposureScore: 82,
      exposureLevel: "high",
      suggestions: [
        "Use hardware wallets for cryptocurrency storage",
        "Enable advanced authentication for exchange accounts",
        "Avoid discussing portfolio details on public forums",
        "Regularly rotate passwords for financial services"
      ],
    };
  }

  if (normalized === "digital_nomad") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Instagram", url: "https://instagram.com/digital_nomad", icon: "instagram" },
        { name: "Twitter", url: "https://twitter.com/digital_nomad", icon: "twitter" },
        { name: "YouTube", url: "https://youtube.com/@digital_nomad", icon: "youtube" },
        { name: "Medium", url: "https://medium.com/@digital_nomad", icon: "medium" },
      ],
      breaches: [],
      exposureScore: 45,
      exposureLevel: "medium",
      suggestions: [
        "Use a VPN when connecting to public Wi-Fi networks",
        "Review location data sharing settings on social platforms",
        "Be mindful of sharing real-time location information",
        "Consider using travel-specific email addresses for bookings"
      ],
    };
  }

  if (normalized === "gaming_legend") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Twitch", url: "https://twitch.tv/gaming_legend", icon: "twitch" },
        { name: "YouTube", url: "https://youtube.com/@gaming_legend", icon: "youtube" },
        { name: "Twitter", url: "https://twitter.com/gaming_legend", icon: "twitter" },
        { name: "Discord", url: "#", icon: "discord" },
        { name: "Steam", url: "https://steamcommunity.com/id/gaming_legend", icon: "steam" },
      ],
      breaches: [
        {
          name: "Gaming Forum",
          domain: "gamerdiscuss.net",
          breachDate: "2023-02-05",
          addedDate: "2023-02-07",
          description: "Popular gaming forum breach exposing user credentials and private messages.",
          dataClasses: ["Emails", "Passwords", "Private Messages"],
          isVerified: true,
          isFabricated: false,
          isSensitive: false,
          isRetired: false,
          isSpamList: false,
          logoPath: "/logos/gaming.png",
          source: "HIBP"
        }
      ],
      exposureScore: 58,
      exposureLevel: "medium",
      suggestions: [
        "Use screen names that don't reveal personal information",
        "Be careful with voice chat in public gaming sessions",
        "Review privacy settings on gaming platforms",
        "Use game-specific emails for registrations"
      ],
    };
  }

  if (normalized === "photo_wizard") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Instagram", url: "https://instagram.com/photo_wizard", icon: "instagram" },
        { name: "Pinterest", url: "https://pinterest.com/photo_wizard", icon: "pinterest" },
        { name: "Flickr", url: "#", icon: "camera" },
      ],
      breaches: [],
      exposureScore: 28,
      exposureLevel: "low",
      suggestions: [
        "Check that image metadata is stripped from photos before sharing",
        "Consider watermarking valuable content",
        "Review terms of service on photo sharing platforms",
        "Be mindful of location tagging in photography posts"
      ],
    };
  }

  if (normalized === "johndoe") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" },
        { name: "GitHub", url: "https://github.com/johndoe", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "linkedin" },
      ],
      breaches: [],
      exposureScore: 55,
      exposureLevel: "medium",
      suggestions: [
        "Enable two-factor authentication (2FA) on all accounts.",
        "Use a password manager to generate strong, unique passwords.",
        "Regularly review and update your privacy settings on social media platforms.",
      ],
    };
  }

  if (normalized === "janedoe") {
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Instagram", url: "https://instagram.com/janedoe", icon: "instagram" },
        { name: "Facebook", url: "https://facebook.com/janedoe", icon: "facebook" },
      ],
      breaches: [],
      exposureScore: 30,
      exposureLevel: "low",
      suggestions: [
        "Be cautious about sharing personal information online.",
        "Review your Facebook privacy settings to limit who can see your posts and profile information.",
      ],
    };
  }

  if (normalized === "safeuser") {
    return {
      input,
      inputType: "username",
      platforms: [],
      breaches: [],
      exposureScore: 10,
      exposureLevel: "low",
      suggestions: [
        "Continue practicing safe online habits.",
        "Regularly check for any data breaches or security alerts related to your accounts.",
      ],
    };
  }

  if (normalized === "johndoe@example.com") {
    return {
      input,
      inputType: "email",
      platforms: [
        { name: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" }
      ],
      breaches: [
        {
          name: "LinkedIn",
          domain: "linkedin.com",
          breachDate: "2016-05-17",
          addedDate: "2016-05-18",
          description: "Data stolen from LinkedIn. (HIBP example)",
          dataClasses: ["Emails", "Passwords", "Usernames"],
          isVerified: true,
          isFabricated: false,
          isSensitive: false,
          isRetired: false,
          isSpamList: false,
          logoPath: "/logos/linkedin.png",
          source: "HIBP"
        },
        {
          name: "Adobe",
          domain: "adobe.com",
          breachDate: "2013-10-04",
          addedDate: "2013-10-06",
          description: "Data exposed from Adobe. (XON example)",
          dataClasses: ["Emails", "Passwords", "Security Questions"],
          isVerified: true,
          isFabricated: false,
          isSensitive: false,
          isRetired: false,
          isSpamList: false,
          logoPath: "/logos/adobe.png",
          source: "XON"
        }
      ],
      exposureScore: 72,
      exposureLevel: "high",
      suggestions: [
        "Enable two-factor authentication (2FA) on all accounts.",
        "Change your password and do not reuse passwords across sites.",
        "Review connected profiles and update your privacy settings."
      ]
    };
  }

  if (normalized === "janedoe@example.com") {
    return {
      input,
      inputType: "email",
      platforms: [
        { name: "Instagram", url: "https://instagram.com/janedoe", icon: "instagram" },
        { name: "Facebook", url: "https://facebook.com/janedoe", icon: "facebook" },
      ],
      breaches: [
        {
          name: "MySpace",
          domain: "myspace.com",
          breachDate: "2016-05-26",
          addedDate: "2016-05-27",
          description: "Compromised accounts from MySpace.",
          dataClasses: ["Emails", "Passwords", "Usernames"],
          isVerified: true,
          isFabricated: false,
          isSensitive: false,
          isRetired: false,
          isSpamList: false,
          logoPath: "/logos/myspace.png",
          source: "HIBP"
        },
      ],
      exposureScore: 60,
      exposureLevel: "medium",
      suggestions: [
        "Update your passwords, especially on older accounts.",
        "Be cautious of phishing emails.",
      ],
    };
  }

  if (normalized === "safeuser@example.com") {
    return {
      input,
      inputType: "email",
      platforms: [],
      breaches: [],
      exposureScore: 25,
      exposureLevel: "low",
      suggestions: [
        "Continue practicing safe online habits.",
        "Consider using a password manager.",
      ],
    };
  }

  // Handle real Gmail or other email addresses that aren't in our predefined list
  if (normalized.includes("@") && normalized.includes(".")) {
    // Extract username part before @ for personalization
    const username = normalized.split('@')[0];
    const domain = normalized.split('@')[1];

    // Expanded list of platforms for generic email searches
    return {
      input,
      inputType: "email",
      platforms: [
        { name: "Google Search", url: `https://www.google.com/search?q=${encodeURIComponent(input)}`, icon: "circle" },
        { name: "Twitter", url: `https://twitter.com/search?q=${encodeURIComponent(input)}`, icon: "twitter" },
        { name: "Facebook", url: `https://facebook.com/search/top/?q=${encodeURIComponent(input)}`, icon: "facebook" },
        { name: "Instagram", url: `https://instagram.com/${username}`, icon: "instagram" },
        { name: "LinkedIn", url: `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(input)}`, icon: "linkedin" },
        { name: "Reddit", url: `https://www.reddit.com/search/?q=${encodeURIComponent(input)}`, icon: "circle" },
        { name: "Pinterest", url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(input)}`, icon: "circle" },
        { name: "GitHub", url: `https://github.com/search?q=${encodeURIComponent(input)}&type=users`, icon: "circle" },
        { name: "Medium", url: `https://medium.com/search?q=${encodeURIComponent(input)}`, icon: "circle" },
        { name: "Steam", url: `https://steamcommunity.com/search/users/#text=${username}`, icon: "circle" },
        { name: "TikTok", url: `https://www.tiktok.com/@${username}`, icon: "circle" }
      ],
      breaches: [],
      exposureScore: 35,
      exposureLevel: "medium",
      suggestions: [
        "Enable two-factor authentication on your accounts.",
        `Check if ${domain} offers advanced security features.`,
        "Use a password manager for stronger, unique passwords.",
        "Regularly review third-party apps with access to your accounts."
      ],
    };
  }

  // Sherlock simulation: for custom usernames (not emails and not the above mocked cases)
  if (!normalized.includes("@")) {
    // Expanded list: simulate presence or search links for more platforms
    return {
      input,
      inputType: "username",
      platforms: [
        { name: "Twitter", url: `https://twitter.com/${normalized}`, icon: "twitter" },
        { name: "Instagram", url: `https://instagram.com/${normalized}`, icon: "instagram" },
        { name: "Facebook", url: `https://facebook.com/${normalized}`, icon: "facebook" },
        { name: "LinkedIn", url: `https://linkedin.com/in/${normalized}`, icon: "linkedin" },
        { name: "YouTube", url: `https://youtube.com/@${normalized}`, icon: "circle" },
        { name: "Reddit", url: `https://www.reddit.com/user/${normalized}`, icon: "circle" },
        { name: "Pinterest", url: `https://www.pinterest.com/${normalized}`, icon: "circle" },
        { name: "Snapchat", url: `https://snapchat.com/add/${normalized}`, icon: "circle" },
        { name: "TikTok", url: `https://www.tiktok.com/@${normalized}`, icon: "circle" },
        { name: "Tumblr", url: `https://${normalized}.tumblr.com`, icon: "circle" },
        { name: "Medium", url: `https://medium.com/@${normalized}`, icon: "circle" },
        { name: "Twitch", url: `https://twitch.tv/${normalized}`, icon: "circle" },
        { name: "Discord", url: `https://discord.me/${normalized}`, icon: "circle" },
        { name: "Steam", url: `https://steamcommunity.com/id/${normalized}`, icon: "circle" },
        { name: "GitHub", url: `https://github.com/${normalized}`, icon: "circle" }
      ],
      breaches: [],
      exposureScore: 48,
      exposureLevel: "medium",
      suggestions: [
        "Enable two-factor authentication on all accounts.",
        "Review your public profile visibility.",
        "Remove unused profiles to minimize digital footprint."
      ],
    }
  }

  return null;
}
