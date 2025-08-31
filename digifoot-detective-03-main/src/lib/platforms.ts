
// Contains platform definitions used by username search

import { Platform } from "@/types";

// Common platforms to check
export const PLATFORMS: Omit<Platform, 'username' | 'avatarUrl'>[] = [
  // Social Media Platforms (High Exposure Risk)
  { name: 'Facebook', url: 'https://facebook.com/{username}', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/{username}', icon: 'instagram' },
  { name: 'Twitter', url: 'https://twitter.com/{username}', icon: 'twitter' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/{username}', icon: 'linkedin' },
  { name: 'TikTok', url: 'https://tiktok.com/@{username}', icon: 'tiktok' },
  { name: 'Reddit', url: 'https://reddit.com/user/{username}', icon: 'reddit' },
  { name: 'Pinterest', url: 'https://pinterest.com/{username}', icon: 'pinterest' },
  { name: 'Snapchat', url: 'https://snapchat.com/add/{username}', icon: 'snapchat' },
  { name: 'YouTube', url: 'https://youtube.com/@{username}', icon: 'youtube' },
  { name: 'Tumblr', url: 'https://{username}.tumblr.com', icon: 'tumblr' },
  
  // Developer & Professional Platforms
  { name: 'GitHub', url: 'https://github.com/{username}', icon: 'github' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/{username}', icon: 'stack' },
  { name: 'Dribbble', url: 'https://dribbble.com/{username}', icon: 'dribbble' },
  { name: 'Behance', url: 'https://behance.net/{username}', icon: 'behance' },
  { name: 'Kaggle', url: 'https://www.kaggle.com/{username}', icon: 'database' },
  { name: 'Product Hunt', url: 'https://www.producthunt.com/@{username}', icon: 'award' },
  
  // Additional platforms
  { name: 'Medium', url: 'https://medium.com/@{username}', icon: 'medium' },
  { name: 'Twitch', url: 'https://twitch.tv/{username}', icon: 'twitch' },
  { name: 'Steam', url: 'https://steamcommunity.com/id/{username}', icon: 'gamepad' },
  { name: 'DeviantArt', url: 'https://{username}.deviantart.com', icon: 'image' },
  { name: 'Soundcloud', url: 'https://soundcloud.com/{username}', icon: 'music' },
  { name: 'Mastodon', url: 'https://mastodon.social/@{username}', icon: 'message-circle' },
  { name: 'Discord', url: '#', icon: 'discord' },
  { name: 'Patreon', url: 'https://www.patreon.com/{username}', icon: 'heart' },
  { name: 'Flickr', url: 'https://www.flickr.com/people/{username}', icon: 'camera' },
  
  // Advanced Platform Search
  { name: 'Sherlock', url: 'https://sherlock-project.github.io/results/{username}', icon: 'github' },
];

// Export a function to get integrated vs pending platforms status
export const getPlatformStatus = (platforms: Platform[], username: string) => {
  const allPlatforms = PLATFORMS.map(p => ({
    ...p, 
    username,
    url: p.url.replace('{username}', username),
  }));
  
  // Find which platforms are integrated (found in the search results)
  const integrated = allPlatforms.filter(ap => 
    platforms.some(p => p.name.toLowerCase() === ap.name.toLowerCase())
  );
  
  // Find which platforms are pending (not found in the search results)
  const pending = allPlatforms.filter(ap => 
    !platforms.some(p => p.name.toLowerCase() === ap.name.toLowerCase())
  );
  
  return { integrated, pending };
};
