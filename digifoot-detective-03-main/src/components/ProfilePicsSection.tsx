
import React from "react";
import { Image } from "lucide-react";

type ProfilePicsSectionProps = {
  pics: { url: string; platformName?: string }[];
};

export const ProfilePicsSection: React.FC<ProfilePicsSectionProps> = ({ pics }) => {
  if (!pics.length) return null;
  return (
    <section className="glass-card my-6 p-4">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
        <Image size={20}/>{" "}Profile Pictures Across Platforms
      </h3>
      <div className="flex flex-wrap gap-4">
        {pics.map((pic, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <img src={pic.url} alt="Profile pic" className="w-20 h-20 rounded-full border shadow bg-white" />
            {pic.platformName && (
              <span className="text-xs text-muted-foreground">{pic.platformName}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
