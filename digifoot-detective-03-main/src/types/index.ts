
export interface Platform {
  name: string;
  url: string;
  icon: string;
  username?: string;
  avatarUrl?: string; // Adding this property to fix the TypeScript error
}

export interface Breach {
  name: string;
  domain: string;
  breachDate: string;
  addedDate: string;
  description: string;
  dataClasses: string[];
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
  isRetired: boolean;
  isSpamList: boolean;
  logoPath: string;
  source?: "HIBP" | "DeHashed" | "Enzoic" | "XON" | "Mock";
}

export interface SearchResult {
  input: string;
  inputType: 'username' | 'email';
  platforms: Platform[];
  breaches: Breach[];
  exposureScore: number;
  exposureLevel: 'low' | 'medium' | 'high';
  suggestions: string[];
  requiresAPIKey?: boolean;
  hibpNote?: string;
}
