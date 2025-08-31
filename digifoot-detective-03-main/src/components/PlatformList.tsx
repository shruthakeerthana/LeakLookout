
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platform } from "@/types";
import { Instagram, Twitter, Facebook, Youtube, Linkedin, Circle } from "lucide-react";

interface PlatformListProps {
  platforms: Platform[];
}

export const PlatformList: React.FC<PlatformListProps> = ({ platforms }) => {
  // Map platform icons to Lucide components
  const getIconComponent = (iconName: string, size = 24) => {
    switch (iconName.toLowerCase()) {
      case "instagram":
        return <Instagram size={size} className="text-pink-500" />;
      case "twitter":
        return <Twitter size={size} className="text-blue-400" />;
      case "facebook":
        return <Facebook size={size} className="text-blue-600" />;
      case "youtube":
        return <Youtube size={size} className="text-red-600" />;
      case "linkedin":
        return <Linkedin size={size} className="text-blue-700" />;
      default:
        return <Circle size={size} className="text-gray-500" />;
    }
  };

  if (platforms.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Platform Presence</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No platforms found for this username.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Platform Presence</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card card-hover"
            >
              <div className="mb-2">
                {getIconComponent(platform.icon, 32)}
              </div>
              <span className="text-sm font-medium">{platform.name}</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
